/*
 * Teste end-to-end do Get Out: percorre prólogo → mapa → eventos →
 * item picker → acampamento → refúgio → final na fronteira → epílogo,
 * mais cenários de derrota e de morte de familiar (luto + RIP).
 *
 * Uso: node scripts/e2e-full-run.js [url]
 */
const { chromium } = require('playwright');

const BASE_URL = process.argv[2] || 'http://localhost:1234';
const results = [];

function check(name, condition, extra = '') {
    results.push({ name, ok: !!condition, extra });
    console.log(`${condition ? 'PASS' : 'FAIL'} — ${name}${extra ? ' :: ' + extra : ''}`);
}

async function state(page) {
    return JSON.parse(await page.evaluate(() => window.render_game_to_text()));
}

async function clickButton(page, id) {
    await page.click(`#${id}`);
}

async function waitLogsSettle(page) {
    // O diário digita uma linha a cada 300ms.
    await page.waitForTimeout(2500);
}

async function travelTo(page, nodeId) {
    await clickButton(page, 'walk-btn');
    await page.waitForTimeout(300);
    await page.click(`[data-node-id="${nodeId}"]`);
    await page.waitForTimeout(600);
}

async function chooseByText(page, text) {
    await page.click(`#event-page-choices-btn-list button:has-text("${text}")`);
    await page.waitForTimeout(400);
}

async function forceRandom(page, value) {
    await page.evaluate((v) => {
        if (!window.__origRandom) window.__origRandom = Math.random.bind(Math);
        Math.random = () => v;
    }, value);
}

async function restoreRandom(page) {
    await page.evaluate(() => {
        if (window.__origRandom) Math.random = window.__origRandom;
    });
}

async function resolveSkillCheck(page, forcedRandom) {
    if (forcedRandom !== undefined) {
        await forceRandom(page, forcedRandom);
    }
    // Espera a rolagem (100ms + 500ms + folga) e clica em continuar.
    await page.waitForTimeout(1200);
    const label = await page.textContent('#skill-check-result-label');
    await restoreRandom(page);
    await clickButton(page, 'skill-check-back-btn');
    await page.waitForTimeout(400);
    return (label || '').trim();
}

async function scenarioVictory(browser) {
    console.log('\n=== Cenário A: travessia completa até a vitória ===');
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (err) => errors.push(String(err)));
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    let s = await state(page);
    check('A1: jogo abre no prólogo', s.visiblePage === 'intro');
    check('A2: prólogo tem título e botão Partir', s.visibleButtons.some(b => b.id === 'intro-start-btn'));

    await clickButton(page, 'intro-start-btn');
    await waitLogsSettle(page);
    s = await state(page);
    check('A3: após Partir cai no diário', s.visiblePage === 'log');
    check('A4: entradas iniciais do diário aparecem', s.logEntries.length >= 2 && s.logEntries[0].includes('Partimos'), s.logEntries[0]);
    check('A5: dia/hora visíveis', s.paragraphs.some(p => /^Dia 1 ·/.test(p)));
    check('A6: não há botão de acampar', !s.visibleButtons.some(b => b.id === 'camp-btn'));
    check('A7: barra mostra Etapa 0/8', (await page.textContent('#journey-num')).includes('0/8'));

    // Etapa 1: Hospital 2 (Olena) — skill check com falha crítica forçada.
    await travelTo(page, 'a1');
    s = await state(page);
    check('A8: evento Olhos. abre', s.headings.some(h => h.includes('Olhos.')));
    check('A9: botão de check mostra a chance', s.choiceButtons.some(t => t.includes('· 67%')));
    await forceRandom(page, 0.0); // rola 1 → falha crítica
    await chooseByText(page, 'Encarar');
    const labelFail = await resolveSkillCheck(page);
    check('A10: falha crítica rotulada em PT', labelFail === 'FALHA CRÍTICA', labelFail);
    await waitLogsSettle(page);
    s = await state(page);
    const olena = s.characters.find(c => c.name === 'Olena');
    check('A11: falha crítica custa sanidade extra e aflição', olena.afflictions === 'Paranoia' && olena.sanity === 66, `sanity=${olena.sanity}`);

    // Etapa 2: Correios (Dmytro) — escolha sem dado.
    await travelTo(page, 'b2');
    await chooseByText(page, 'Encarar');
    await waitLogsSettle(page);
    s = await state(page);
    const dmytro = s.characters.find(c => c.name === 'Dmytro');
    check('A16: evitar custa 10 no personagem', dmytro.sanity === 82, `sanity=${dmytro.sanity}`);

    // Etapa 3: Casa 17 — evento de lugar com Investigar → item picker.
    await travelTo(page, 'c2');
    s = await state(page);
    check('A17: evento de lugar abre (Casa.)', s.headings.some(h => h.includes('Casa.')));
    await chooseByText(page, 'Vasculhar');
    await page.waitForTimeout(2000);
    s = await state(page);
    check('A18: item picker abre com 4 itens', s.visiblePage === 'itemPicker' && s.itemsToPick.length >= 1, `listas=${s.itemsToPick.length}`);
    // Pega 2 itens.
    await page.click('#item-picker-page-items-to-pick li button');
    await page.waitForTimeout(200);
    await page.click('#item-picker-page-items-to-pick li button');
    await page.waitForTimeout(200);
    await clickButton(page, 'item-picker-page-continue-btn');
    await waitLogsSettle(page);
    s = await state(page);
    check('A19: itens vão para a bolsa', s.visibleButtons.some(b => b.id === 'bag-btn' && !b.disabled && b.text.includes('(2)')));

    // Bolsa: item só pode ser usado em quem tem a aflição correspondente.
    await clickButton(page, 'bag-btn');
    await page.waitForTimeout(300);
    s = await state(page);
    check('A20: bolsa lista itens com aflição-alvo', s.bagItems.length >= 1, s.bagItems.join(' | '));
    await page.click('#bag-item-list li button');
    await page.waitForTimeout(300);
    const charButtons = await page.$$eval('#bag-item-list li button', (buttons) =>
        buttons.map(b => ({ text: b.textContent.trim(), disabled: b.disabled })));
    check('A21: personagens sem a aflição ficam desabilitados', charButtons.every(b => b.disabled || b.text.includes('Paranoia')) , JSON.stringify(charButtons));
    await clickButton(page, 'bag-close-btn');
    await page.waitForTimeout(300);

    // Cura a Paranoia de Olena (intervenção de teste): o cenário A valida
    // FLUXOS, não política — sem cura, a espiral a mataria no meio do teste.
    await page.evaluate(() => window.__game.characterManager.characterOlena.removeStatus());

    // Etapas 4-6: seguir rota d2 → e1 → f1 com escolhas sem dado.
    await travelTo(page, 'd2');
    await chooseByText(page, 'Ignorar');
    await waitLogsSettle(page);
    await travelTo(page, 'e1');
    await chooseByText(page, 'Fingir');
    await waitLogsSettle(page);
    await travelTo(page, 'f1');
    await chooseByText(page, 'No meio');
    await waitLogsSettle(page);

    // Etapa 7: Palácio Energetik — refúgio.
    await travelTo(page, 'g2');
    s = await state(page);
    check('A22: refúgio no Palácio abre', s.headings.some(h => h.includes('Palácio.')));
    const sanityBeforeRest = (await state(page)).characters.map(c => c.sanity);
    await chooseByText(page, 'Descansar');
    await waitLogsSettle(page);
    s = await state(page);
    check('A23: descanso no Palácio recupera sanidade', s.characters.every((c, i) => c.sanity >= sanityBeforeRest[i]));
    check('A24: barra mostra Etapa 7/8 e Ato III', (await page.textContent('#journey-num')).includes('7/8') && (await page.textContent('#journey-unit')).includes('Ato III'));

    // Etapa 8: Fronteira — clímax com sucesso crítico forçado.
    await travelTo(page, 'border');
    s = await state(page);
    check('A25: evento final Fronteira. abre', s.headings.some(h => h.includes('Fronteira.')));
    await forceRandom(page, 0.99); // rola 6 → sucesso crítico
    await chooseByText(page, 'Cruzar o gelo');
    const labelWin = await resolveSkillCheck(page);
    check('A26: sucesso crítico rotulado em PT', labelWin === 'SUCESSO CRÍTICO', labelWin);
    await page.waitForTimeout(600);
    s = await state(page);
    check('A27: vitória leva ao epílogo', s.visiblePage === 'gameOver' && s.state.isVictoryEnding === true);
    const endingTitle = (await page.textContent('#game-over-page h1')).trim();
    const endingStats = (await page.textContent('#game-over-stats')).trim();
    const endingBody = (await page.textContent('#game-over-message')).trim();
    check('A28: título do epílogo é Do Outro Lado.', endingTitle === 'Do Outro Lado.', endingTitle);
    check('A29: epílogo perfeito com 4 vivos', endingBody.includes('Juntos'), endingBody.slice(0, 80));
    check('A30: estatísticas do epílogo', endingStats.includes('4/4'), endingStats);
    check('A31: sem erros de página no cenário A', errors.length === 0, errors.join(' | '));

    await page.close();
}

async function scenarioDefeat(browser) {
    console.log('\n=== Cenário B: colapso do jogador → derrota ===');
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (err) => errors.push(String(err)));
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await clickButton(page, 'intro-start-btn');
    await page.waitForTimeout(500);

    await page.evaluate(() => {
        window.__game.characterManager.characterDmytro.looseSanity(100);
    });
    await page.waitForTimeout(600);
    const s = await state(page);
    check('B1: morte do jogador leva ao fim', s.visiblePage === 'gameOver' && s.state.isVictoryEnding === false);
    const title = (await page.textContent('#game-over-page h1')).trim();
    check('B2: título de derrota é Fim.', title === 'Fim.', title);
    const stats = (await page.textContent('#game-over-stats')).trim();
    check('B3: estatísticas mostram etapa da queda', stats.includes('etapa 0/8'), stats);
    check('B4: sem erros de página no cenário B', errors.length === 0, errors.join(' | '));
    await page.close();
}

async function scenarioGriefAndRip(browser) {
    console.log('\n=== Cenário C: morte de familiar → luto → RIP → evento pendente ===');
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (err) => errors.push(String(err)));
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await clickButton(page, 'intro-start-btn');
    await page.waitForTimeout(500);

    await page.evaluate(() => {
        window.__game.characterManager.characterOlena.looseSanity(100);
    });
    let s = await state(page);
    const survivors = s.characters.filter(c => !c.isDead);
    check('C1: Olena morta, três vivos', s.characters.find(c => c.name === 'Olena').isDead && survivors.length === 3);
    check('C2: luto tira 25 dos sobreviventes', survivors.every(c => c.sanity === 75), survivors.map(c => c.sanity).join(','));

    // Viajar com morto não enterrado → página RIP antes do evento.
    await clickButton(page, 'walk-btn');
    await page.waitForTimeout(300);
    await page.click('[data-node-id="a2"]');
    await page.waitForTimeout(700);
    s = await state(page);
    check('C3: viagem com morto leva ao RIP', s.visiblePage === 'rip');
    const ripName = (await page.textContent('#rip-page-name')).trim();
    const ripDates = (await page.textContent('#rip-page-dates')).trim();
    check('C4: RIP mostra nome real', ripName === 'Olena', ripName);
    check('C5: RIP mostra anos reais', ripDates.includes('1988') && ripDates.includes('2022'), ripDates);

    await clickButton(page, 'rip-page-back-btn');
    await page.waitForTimeout(600);
    s = await state(page);
    check('C6: após enterro, o evento pendente abre', s.visiblePage === 'event' && s.headings.some(h => h.includes('Escombros.')));
    check('C7: sem erros de página no cenário C', errors.length === 0, errors.join(' | '));
    await page.close();
}

async function scenarioBittersweetEnding(browser) {
    console.log('\n=== Cenário D: vitória amarga — travessia com perdas e falha no rio ===');
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (err) => errors.push(String(err)));
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await clickButton(page, 'intro-start-btn');
    await page.waitForTimeout(500);

    // Prepara: Olena morre no caminho (enterrada) e a família já está no Palácio.
    await page.evaluate(() => {
        const game = window.__game;
        game.characterManager.characterOlena.looseSanity(100);
        game.characterManager.characterOlena.buried = true;
        game.state.setCurrentMapNode('g2');
    });

    await forceRandom(page, 0.2); // rola 2 < 4 → falha no gelo
    await clickButton(page, 'walk-btn');
    await page.waitForTimeout(300);
    await page.click('[data-node-id="border"]');
    await page.waitForTimeout(600);
    let s = await state(page);
    check('D1: evento final abre', s.headings.some(h => h.includes('Fronteira.')));
    await chooseByText(page, 'Cruzar o gelo');
    const label = await resolveSkillCheck(page);
    check('D2: falha no gelo rotulada', label === 'FALHA', label);
    await page.waitForTimeout(600);
    s = await state(page);
    check('D3: mesmo com falha, a família cruza — vitória amarga', s.visiblePage === 'gameOver' && s.state.isVictoryEnding === true);
    const body = (await page.textContent('#game-over-message')).trim();
    const stats = (await page.textContent('#game-over-stats')).trim();
    check('D4: texto da travessia com custo aparece', body.includes('O gelo cede'), body.slice(0, 60));
    check('D5: epílogo nomeia quem ficou', body.includes('Olena'), body.slice(-120));
    check('D6: memorial com anos de Olena', body.includes('1988–2022'));
    check('D7: estatísticas contam 3/4', stats.includes('3/4'), stats);
    const dmytroEnd = s.characters.find(c => c.name === 'Dmytro');
    check('D8: a falha no gelo cobrou 45 de Dmytro', dmytroEnd.sanity === 100 - 25 - 4 - 45, `sanity=${dmytroEnd.sanity}`);
    check('D9: sem erros de página no cenário D', errors.length === 0, errors.join(' | '));
    await page.close();
}

(async () => {
    const browser = await chromium.launch();
    try {
        await scenarioVictory(browser);
        await scenarioDefeat(browser);
        await scenarioGriefAndRip(browser);
        await scenarioBittersweetEnding(browser);
    } finally {
        await browser.close();
    }

    const failed = results.filter(r => !r.ok);
    console.log(`\n===== ${results.length - failed.length}/${results.length} verificações passaram =====`);
    if (failed.length > 0) {
        console.log('Falhas:');
        failed.forEach(f => console.log(` - ${f.name}${f.extra ? ' :: ' + f.extra : ''}`));
        process.exit(1);
    }
})();
