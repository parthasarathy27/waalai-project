import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error(`Page Error: ${msg.text()}`);
    }
  });

  page.on('pageerror', error => {
    console.error(`Uncaught Exception: ${error.message}`);
  });

  console.log("Navigating to http://localhost:5174/order...");
  await page.goto('http://localhost:5174/order', { waitUntil: 'networkidle0' });

  console.log("Looking for Add button...");
  await page.waitForSelector('button:has-text("Add")');
  
  const buttons = await page.$$('button');
  let addBtn = null;
  for (let btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('Add')) {
          addBtn = btn;
          break;
      }
  }

  if (addBtn) {
      console.log("Clicking Add button...");
      await addBtn.click();
      await page.waitForTimeout(2000);

      // Check if checkout button appears
      console.log("Checking if Cart opened...");
      let btns = await page.$$('button');
      let foundCheckout = false;
      for (let b of btns) {
          const t = await page.evaluate(el => el.textContent, b);
          if (t.includes('Confirm Over WhatsApp')) {
              foundCheckout = true;
              console.log("Cart is open. Clicking Checkout...");
              await b.click();
              await page.waitForTimeout(2000);
              break;
          }
      }
      if (!foundCheckout) {
          console.log("Cart did not open or Checkout button missing.");
          const bodyHtml = await page.evaluate(() => document.body.innerHTML);
          // Look for WaalaiText failure
          if(bodyHtml.includes("WaalaiText")) {
              console.log("WaalaiText is in DOM raw.");
          }
      }
  }

  await browser.close();
})();
