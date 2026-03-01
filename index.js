const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const seeds = [
    "https://sanand0.github.io/tdsdata/js_table/?seed=1",
    "https://sanand0.github.io/tdsdata/js_table/?seed=2",
    "https://sanand0.github.io/tdsdata/js_table/?seed=3",
    "https://sanand0.github.io/tdsdata/js_table/?seed=4",
    "https://sanand0.github.io/tdsdata/js_table/?seed=5",
    "https://sanand0.github.io/tdsdata/js_table/?seed=6",
    "https://sanand0.github.io/tdsdata/js_table/?seed=7",
    "https://sanand0.github.io/tdsdata/js_table/?seed=8",
    "https://sanand0.github.io/tdsdata/js_table/?seed=9",
    "https://sanand0.github.io/tdsdata/js_table/?seed=10",
  ];

  let grandTotal = 0;

  for (const url of seeds) {
    await page.goto(url, { waitUntil: 'networkidle' });

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(cell => parseFloat(cell.innerText))
        .filter(num => !isNaN(num))
    );

    const sum = numbers.reduce((a, b) => a + b, 0);
    grandTotal += sum;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();
