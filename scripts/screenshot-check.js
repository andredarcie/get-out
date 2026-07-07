/* Captura telas principais para verificação visual. */
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 390, height: 780 } });
    await page.goto(process.argv[2] || 'http://localhost:1234', { waitUntil: 'networkidle' });

    await page.waitForTimeout(4000);
    await page.screenshot({ path: 'test-artifacts/shot-intro.png' });

    await page.click('#intro-start-btn');
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'test-artifacts/shot-log.png' });

    await page.click('#walk-btn');
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'test-artifacts/shot-map.png' });

    await page.click('[data-node-id="a1"]');
    await page.waitForTimeout(2500);
    await page.screenshot({ path: 'test-artifacts/shot-event.png' });

    await browser.close();
    console.log('done');
})();
