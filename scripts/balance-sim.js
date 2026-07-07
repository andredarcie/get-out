/*
 * Monte Carlo do balanceamento — espelha as mecânicas do jogo em memória
 * para tunar constantes antes de aplicar no código.
 *
 * Políticas:
 *  SMART   — risco calculado: rola Médio com personagem saudável, evita com
 *            frágil, pega/usa itens, descansa no Palácio, final conforme estado
 *  TURTLE  — evita tudo, descansa, espera na fronteira
 *  GAMBLER — rola tudo, ignora itens/descanso, cruza o gelo
 *
 * Uso: node scripts/balance-sim.js [runsPorPolitica]
 */
const N = parseInt(process.argv[2] || '10000', 10);

// ── Constantes de balanceamento (candidatas) ─────────────────────
const C = {
    FATIGUE_PER_STEP: 4,
    AVOID_COST: 10,
    AVOID_GROUP_COST: 4,   // evitar abala os demais
    MEDIUM_SUCCESS: 15,
    MEDIUM_FAIL: 18,
    HARD_SUCCESS: 20,
    HARD_FAIL: 32,
    CRIT_FAIL_EXTRA: 12,
    CRIT_SUCCESS_BONUS: 10,
    PALACE_REST: 15,
    GRIEF: 25,
    GRIEF_FLOOR: 5,
    ICE_FAIL: 45,          // Dmytro + 1 sobrevivente
    ICE_SUCCESS_HEAL: 10,  // todos
    WAIT_FAIL: 15,         // todos
};

const AFFLICTION_DRAINS = [4, 4, 4, 5, 5, 5, 6, 6, 7, 8];

// Mapa: linhas de nós; cada nó = evento psicológico {char, hard} ou lugar {place} ou palácio
const NODES = {
    a1: { char: 1, hard: false }, a2: { char: 0, hard: false },
    b1: { char: 1, hard: false }, b2: { char: 0, hard: false }, b3: { char: 0, hard: true },
    c1: { char: 1, hard: false }, c2: { place: true },
    d1: { place: true }, d2: { char: 2, hard: false }, d3: { char: 3, hard: false },
    e1: { char: 2, hard: true }, e2: { char: 3, hard: true },
    f1: { char: 2, hard: true }, f2: { char: 3, hard: true }, f3: { place: true },
    g1: { place: true }, g2: { palace: true },
};
const CONN = {
    camp: ['a1', 'a2'], a1: ['b1', 'b2'], a2: ['b2', 'b3'],
    b1: ['c1', 'c2'], b2: ['c1', 'c2'], b3: ['c1', 'c2'],
    c1: ['d1', 'd2', 'd3'], c2: ['d2', 'd3'],
    d1: ['e1', 'e2'], d2: ['e1', 'e2'], d3: ['e1', 'e2'],
    e1: ['f1', 'f2'], e2: ['f2', 'f3'],
    f1: ['g1', 'g2'], f2: ['g1', 'g2'], f3: ['g1', 'g2'],
    g1: ['border'], g2: ['border'],
};

const ROUTE_PREF = {
    SMART:   { a1: 1, a2: 2, b2: 1, b1: 2, b3: 3, c1: 1, c2: 2, d1: 1, d2: 2, d3: 3, e1: 1, e2: 2, f3: 1, f2: 2, f1: 3, g2: 1, g1: 2, border: 1 },
    TURTLE:  { a1: 1, a2: 2, b2: 1, b1: 2, b3: 3, c1: 1, c2: 2, d1: 1, d2: 2, d3: 3, e1: 1, e2: 2, f3: 1, f2: 2, f1: 3, g2: 1, g1: 2, border: 1 },
    GAMBLER: { a2: 1, a1: 2, b3: 1, b2: 2, b1: 3, c1: 1, c2: 2, d2: 1, d3: 2, d1: 3, e1: 1, e2: 2, f1: 1, f2: 2, f3: 3, g1: 1, g2: 2, border: 1 },
};

const d6 = () => Math.floor(Math.random() * 6) + 1;

function newRun() {
    return {
        chars: [100, 100, 100, 100].map((s, i) => ({ sanity: s, dead: false, affliction: -1, isPlayer: i === 0 })),
        bag: [],
    };
}

function loose(run, i, amount) {
    const c = run.chars[i];
    if (c.dead) return;
    c.sanity -= amount;
    if (c.sanity <= 0) {
        c.sanity = 0;
        c.dead = true;
        if (!c.isPlayer) {
            run.chars.forEach((s) => {
                if (!s.dead) s.sanity = Math.max(C.GRIEF_FLOOR, s.sanity - C.GRIEF);
            });
        }
    }
}

function heal(run, i, amount) {
    const c = run.chars[i];
    if (c.dead) return;
    c.sanity = Math.min(100, c.sanity + amount);
}

function walk(run) {
    run.chars.forEach((c, i) => {
        if (c.dead) return;
        if (c.affliction >= 0) loose(run, i, AFFLICTION_DRAINS[c.affliction]);
        loose(run, i, C.FATIGUE_PER_STEP);
    });
}

function avoidEvent(run, charIdx) {
    loose(run, charIdx, C.AVOID_COST);
    run.chars.forEach((c, i) => {
        if (!c.dead && i !== charIdx) loose(run, i, C.AVOID_GROUP_COST);
    });
}

function rollCheck(run, charIdx, hard) {
    const target = hard ? 4 : 3;
    const v = d6();
    const c = run.chars[charIdx];
    if (v === 6) {
        heal(run, charIdx, hard ? C.HARD_SUCCESS : C.MEDIUM_SUCCESS);
        if (c.affliction >= 0) c.affliction = -1;
        else heal(run, charIdx, C.CRIT_SUCCESS_BONUS);
        return true;
    }
    const afflictedMult = c.affliction >= 0 ? 1.5 : 1; // rolar aflito agrava a falha
    if (v === 1) {
        loose(run, charIdx, Math.round(((hard ? C.HARD_FAIL : C.MEDIUM_FAIL) + C.CRIT_FAIL_EXTRA) * afflictedMult));
        if (!c.dead) c.affliction = Math.floor(Math.random() * 10);
        return false;
    }
    if (v >= target) {
        heal(run, charIdx, hard ? C.HARD_SUCCESS : C.MEDIUM_SUCCESS);
        return true;
    }
    loose(run, charIdx, Math.round((hard ? C.HARD_FAIL : C.MEDIUM_FAIL) * afflictedMult));
    if (!c.dead) c.affliction = Math.floor(Math.random() * 10);
    return false;
}

function lootItems(run) {
    // 4 itens aleatórios, leva 2
    for (let k = 0; k < 2; k++) run.bag.push(Math.floor(Math.random() * 10));
}

function useItems(run) {
    run.chars.forEach((c) => {
        if (c.dead || c.affliction < 0) return;
        const idx = run.bag.indexOf(c.affliction);
        if (idx >= 0) {
            run.bag.splice(idx, 1);
            c.affliction = -1;
        }
    });
}

function playOne(policy) {
    const run = newRun();
    let node = 'camp';
    const pref = ROUTE_PREF[policy];

    while (node !== 'border') {
        const options = CONN[node];
        node = options.slice().sort((x, y) => (pref[x] || 9) - (pref[y] || 9))[0];
        walk(run);
        if (run.chars[0].dead) return finish(run, false);
        if (node === 'border') break;

        const spec = NODES[node];
        if (spec.palace) {
            if (policy === 'GAMBLER') {
                lootItems(run); // saqueia, nunca usa
            } else {
                run.chars.forEach((c, i) => heal(run, i, C.PALACE_REST));
            }
        } else if (spec.place) {
            if (policy === 'GAMBLER') {
                // passa direto
            } else {
                lootItems(run);
            }
        } else {
            const i = spec.char;
            const c = run.chars[i];
            if (c.dead) { /* evento se perde */ }
            else if (policy === 'GAMBLER') {
                rollCheck(run, i, spec.hard);
            } else if (policy === 'TURTLE') {
                avoidEvent(run, i);
            } else { // SMART: rola Médio com quem está saudável — nunca com Dmytro, nunca o Difícil
                const canRoll = !spec.hard && i !== 0 && c.sanity >= 55 && c.affliction < 0;
                if (canRoll) {
                    rollCheck(run, i, spec.hard);
                } else {
                    avoidEvent(run, i);
                }
            }
        }

        if (run.chars[0].dead) return finish(run, false);
        if (policy !== 'GAMBLER') useItems(run);
    }

    // ── Fronteira ──
    const alive = run.chars.filter(c => !c.dead);
    const minSanity = Math.min(...alive.map(c => c.sanity));
    const cross = policy === 'GAMBLER';

    if (cross) {
        const v = d6();
        if (v === 6 || (v >= 4 && v !== 1)) {
            run.chars.forEach((c, i) => heal(run, i, C.ICE_SUCCESS_HEAL));
        } else {
            loose(run, 0, C.ICE_FAIL);
            const others = run.chars.map((c, i) => ({ c, i })).filter(x => !x.c.dead && x.i !== 0);
            if (others.length) loose(run, others[Math.floor(Math.random() * others.length)].i, C.ICE_FAIL);
        }
    } else {
        const v = d6();
        if (!(v === 6 || (v >= 3 && v !== 1))) {
            run.chars.forEach((c, i) => loose(run, i, C.WAIT_FAIL));
        }
    }

    return finish(run, !run.chars[0].dead);
}

function finish(run, victory) {
    const alive = run.chars.filter(c => !c.dead);
    return {
        victory,
        survivors: alive.length,
        avgSanity: alive.length ? Math.round(alive.reduce((s, c) => s + c.sanity, 0) / alive.length) : 0,
    };
}

for (const policy of ['SMART', 'TURTLE', 'GAMBLER']) {
    let wins = 0, survTotal = 0, sanityTotal = 0, flawless = 0;
    for (let i = 0; i < N; i++) {
        const r = playOne(policy);
        if (r.victory) {
            wins++;
            survTotal += r.survivors;
            sanityTotal += r.avgSanity;
            if (r.survivors === 4) flawless++;
        }
    }
    const winPct = (100 * wins / N).toFixed(1);
    const avgSurv = wins ? (survTotal / wins).toFixed(2) : '—';
    const avgSan = wins ? Math.round(sanityTotal / wins) : '—';
    const flawlessPct = (100 * flawless / N).toFixed(1);
    console.log(`${policy.padEnd(8)} vitória: ${winPct}% · sobreviventes médios: ${avgSurv} · sanidade média final: ${avgSan} · 4/4: ${flawlessPct}%`);
}
