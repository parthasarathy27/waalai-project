const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Listen to console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error(`Page Error: ${msg.text()}`);
    }
  });

  page.on('pageerror', error => {
    console.error(`Uncaught Exception: ${error.message}`);
  });

  await page.goto('http://localhost:5174/order', { waitUntil: 'networkidle' });
  
  console.log('Opened order page...');
  
  // Click the first "Add" button
  const addButton = page.locator('button:has-text("Add")').first();
  await addButton.click();
  console.log('Clicked Add button.');

  // Wait for cart to maybe appear
  await page.waitForTimeout(1000);

  // Click the checkout button if cart is open
  const checkoutBtn = page.locator('button:has-text("Confirm Over WhatsApp")').first();
  if (await checkoutBtn.isVisible()) {
    console.log('Cart opened. Clicking Checkout...');
    await checkoutBtn.click();
    await page.waitForTimeout(1000);
    console.log('Checkout clicked.');
  } else {
    console.log('Cart did not open.');
  }

  await browser.close();
})();
