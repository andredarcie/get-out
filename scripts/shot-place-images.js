/* Screenshot tour: walks the map and captures each event's new place photo
 * rendered inside the game's aged-photo frame. Dismisses each event via its
 * non-dice choice so no skill check is triggered. Requires the dev server. */
const { chromium } = require('playwright');

const BASE_URL = process.argv[2] || 'http://localhost:1234';
const OUT = process.argv[3] || 'test-artifacts';

// node -> label for filenames (row of the map the node belongs to)
const HOPS = [
    ['a1', 'hospital'],
    ['b2', 'post-office-mural'],
    ['c1', 'pool'],
    ['d2', 'kindergarten'],
    ['e1', 'river-park'],
    ['f2', 'ferris-wheel'],
];

async function dismissEvent(page) {
    // Click the choice button that is NOT a skill check (skill checks show "·").
    await page.evaluate(() => {
        const btns = [...document.querySelectorAll('#event-page-choices-btn-list button')];
        const plain = btns.find((b) => !b.textContent.includes('·') && !/Vasculhar/.test(b.textContent));
        (plain || btns[btns.length - 1]).click();
    });
    await page.waitForTimeout(2200); // let the diary type its lines
}

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 390, height: 780 } });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    await page.waitForTimeout(4000);
    await page.click('#intro-start-btn');
    await page.waitForTimeout(1800);

    for (const [nodeId, name] of HOPS) {
        await page.click('#walk-btn');
        await page.waitForTimeout(500);
        await page.screenshot({ path: `${OUT}/tour-map-${nodeId}.png` });
        await page.click(`[data-node-id="${nodeId}"]`);
        await page.waitForTimeout(3000); // event reveal + photo-develop animation
        await page.screenshot({ path: `${OUT}/tour-${nodeId}-${name}.png` });
        console.log(`shot ${nodeId} ${name}`);
        await dismissEvent(page);
    }

    await browser.close();
    console.log('done');
})();
