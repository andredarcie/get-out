/*
 * Playtest automatizado com dados REAIS (sem RNG forçado).
 *
 * SMART   — risco calculado: rola o Médio com quem está saudável (nunca com
 *           Dmytro, nunca o Difícil, nunca aflito), pega/usa itens, descansa
 *           no Palácio, espera na fronteira.
 * TURTLE  — evita tudo, pega itens, descansa, espera na fronteira.
 * GAMBLER — rola tudo, ignora itens e descanso, cruza o gelo.
 *
 * Uso: node scripts/playtest.js <SMART|TURTLE|GAMBLER> <numRuns> [url]
 */
const { chromium } = require('playwright');

const POLICY = (process.argv[2] || 'SMART').toUpperCase();
const NUM_RUNS = parseInt(process.argv[3] || '6', 10);
const BASE_URL = process.argv[4] || 'http://localhost:1234';

const SAFE_PREF = { a1: 1, a2: 2, b2: 1, b1: 2, b3: 3, c1: 1, c2: 2, d1: 1, d2: 2, d3: 3, e1: 1, e2: 2, f3: 1, f2: 2, f1: 3, g2: 1, g1: 2, border: 1 };
const RISK_PREF = { a2: 1, a1: 2, b3: 1, b2: 2, b1: 3, c1: 1, c2: 2, d2: 1, d3: 2, d1: 3, e1: 1, e2: 2, f1: 1, f2: 2, f3: 3, g1: 1, g2: 2, border: 1 };

const EVENT_CHAR = {
    'Escombros.': 'Dmytro', 'Espelho.': 'Dmytro', 'Gritos.': 'Dmytro',
    'Olhos.': 'Olena', 'Sussurros.': 'Olena', 'Silêncio.': 'Olena',
    'Choro.': 'Mykola', 'Sasha.': 'Mykola', 'Passarela.': 'Mykola',
    'Mural.': 'Sofiia', 'Sombras.': 'Sofiia', 'Roda.': 'Sofiia',
};

async function getState(page) {
    return JSON.parse(await page.evaluate(() => window.render_game_to_text()));
}

function pickChoiceIndex(policy, title, buttons, characters) {
    const withDice = buttons.findIndex(t => t.includes('·'));
    const idxOf = (word) => buttons.findIndex(t => t.includes(word));
    const safeIdx = () => {
        const safe = buttons.findIndex(t => !t.includes('·'));
        return safe >= 0 ? safe : 0;
    };

    if (policy === 'GAMBLER') {
        if (title === 'Fronteira.') return idxOf('Cruzar');
        if (withDice >= 0) return withDice;
        if (title === 'Palácio.') return idxOf('Vasculhar');
        const skipLoot = buttons.findIndex(t => !t.includes('Vasculhar'));
        return skipLoot >= 0 ? skipLoot : 0;
    }

    // SMART e TURTLE compartilham logística; diferem no uso do dado.
    if (title === 'Fronteira.') return idxOf('Esperar');
    if (title === 'Palácio.') return idxOf('Descansar');
    const loot = idxOf('Vasculhar');
    if (loot >= 0) return loot;

    if (policy === 'SMART') {
        const charName = EVENT_CHAR[title];
        const c = characters.find(x => x.name === charName);
        const mediumIdx = buttons.findIndex(t => t.includes('· 67%'));
        if (mediumIdx >= 0 && c && !c.isDead && c.name !== 'Dmytro'
            && c.sanity >= 55 && !c.afflictions) {
            return mediumIdx;
        }
    }

    return safeIdx();
}

async function useBagIfUseful(page, s) {
    const afflicted = () => s.characters.filter(c => !c.isDead && c.afflictions).map(c => c.afflictions);
    let targets = afflicted();
    if (!targets.length) return;

    const bagBtn = await page.$('#bag-btn:not([disabled])');
    if (!bagBtn) return;
    await bagBtn.click();
    await page.waitForTimeout(250);

    for (let i = 0; i < 4; i++) {
        const items = await page.$$eval('#bag-item-list li button', els => els.map(e => e.textContent.trim()));
        const idx = items.findIndex(t => targets.some(a => t.includes('→ ' + a)));
        if (idx < 0) break;

        await page.click(`#bag-item-list li button >> nth=${idx}`);
        await page.waitForTimeout(250);
        const charBtn = await page.$('#bag-item-list li button:not([disabled])');
        if (!charBtn) break;
        await charBtn.click();
        await page.waitForTimeout(250);

        s = await getState(page);
        targets = afflicted();
        if (!targets.length) break;
    }

    await page.click('#bag-close-btn');
    await page.waitForTimeout(200);
}

async function playRun(browser, policy, runId) {
    const page = await browser.newPage();
    const trace = [];
    let usedBag = 0;
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    const deadline = Date.now() + 180000;

    while (Date.now() < deadline) {
        let s;
        try { s = await getState(page); } catch { await page.waitForTimeout(300); continue; }
        const pg = s.visiblePage;

        if (pg === 'intro') {
            await page.click('#intro-start-btn');

        } else if (pg === 'log') {
            if (policy !== 'GAMBLER') {
                const before = s.characters.filter(c => !c.isDead && c.afflictions).length;
                await useBagIfUseful(page, s);
                const after = (await getState(page)).characters.filter(c => !c.isDead && c.afflictions).length;
                usedBag += Math.max(0, before - after);
            }
            await page.click('#walk-btn');

        } else if (pg === 'map') {
            const pref = policy === 'GAMBLER' ? RISK_PREF : SAFE_PREF;
            const ids = await page.$$eval('[data-node-id]:not([disabled])', els => els.map(e => e.dataset.nodeId));
            if (!ids.length) { trace.push({ stuck: true }); break; }
            ids.sort((x, y) => (pref[x] || 9) - (pref[y] || 9));
            await page.click(`[data-node-id="${ids[0]}"]`);

        } else if (pg === 'event') {
            try {
                await page.waitForSelector('#event-page-choices-btn-list button', { timeout: 6000 });
            } catch { continue; }
            const title = ((await page.textContent('#event-page-title')) || '').trim();
            const buttons = await page.$$eval('#event-page-choices-btn-list button', els => els.map(e => e.textContent.trim()));
            const idx = pickChoiceIndex(policy, title, buttons, s.characters);
            trace.push({ event: title, choice: buttons[Math.max(0, idx)] });
            await page.click(`#event-page-choices-btn-list button >> nth=${Math.max(0, idx)}`);

        } else if (pg === 'skillCheck') {
            try {
                await page.waitForSelector('#skill-check-back-btn:not([disabled])', { timeout: 9000 });
            } catch { continue; }
            const label = ((await page.textContent('#skill-check-result-label')) || '').trim();
            const last = trace[trace.length - 1];
            if (last && last.event) last.roll = label;
            await page.click('#skill-check-back-btn');

        } else if (pg === 'itemPicker') {
            try {
                await page.waitForSelector('#item-picker-page-continue-btn', { state: 'visible', timeout: 9000 });
            } catch { continue; }
            if (policy !== 'GAMBLER') {
                for (let i = 0; i < 2; i++) {
                    const btn = await page.$('#item-picker-page-items-to-pick li button:not([disabled])');
                    if (!btn) break;
                    await btn.click();
                    await page.waitForTimeout(150);
                }
            }
            await page.click('#item-picker-page-continue-btn');

        } else if (pg === 'rip') {
            const name = ((await page.textContent('#rip-page-name')) || '').trim();
            trace.push({ died: name });
            await page.click('#rip-page-back-btn');

        } else if (pg === 'gameOver') {
            const title = ((await page.textContent('#game-over-page h1')) || '').trim();
            const stats = ((await page.textContent('#game-over-stats')) || '').trim();
            const final = await getState(page);
            await page.close();
            return {
                runId,
                victory: final.state.isVictoryEnding,
                title,
                stats,
                day: final.state.currentDay,
                survivors: final.characters.filter(c => !c.isDead).map(c => `${c.name}:${c.sanity}`),
                dead: final.characters.filter(c => c.isDead).map(c => c.name),
                usedBag,
                trace,
            };
        }

        await page.waitForTimeout(300);
    }

    await page.close();
    return { runId, victory: null, timeout: true, trace };
}

(async () => {
    const browser = await chromium.launch();
    const results = [];

    for (let i = 1; i <= NUM_RUNS; i++) {
        const r = await playRun(browser, POLICY, i);
        results.push(r);
        const traceStr = r.trace.map(t =>
            t.event ? `${t.event}${t.roll ? '[' + t.roll + ']' : ''}` :
            t.died ? `✝${t.died}` :
            t.stuck ? 'STUCK' : ''
        ).filter(Boolean).join(' → ');
        console.log(`RUN ${i} [${POLICY}] ${r.timeout ? 'TIMEOUT' : r.victory ? 'VITÓRIA' : 'DERROTA'} | ${r.stats || ''} | vivos: ${(r.survivors || []).join(', ')} | mortos: ${(r.dead || []).join(', ') || '—'}${r.usedBag ? ` | itens usados: ${r.usedBag}` : ''}`);
        console.log(`   ${traceStr}`);
    }

    const wins = results.filter(r => r.victory === true).length;
    const losses = results.filter(r => r.victory === false).length;
    const deaths = results.reduce((n, r) => n + (r.dead ? r.dead.length : 0), 0);
    console.log(`\n===== ${POLICY}: ${wins} vitórias / ${losses} derrotas em ${NUM_RUNS} runs · ${deaths} mortes no total =====`);

    await browser.close();
})();
