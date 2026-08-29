import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testI18n() {
  console.log('--- Launching Chrome for i18n Verification ---');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  console.log('Navigating to http://localhost:3000/...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });

  // 1. Initial State (English)
  const initialTitle = await page.$eval('h1', el => el.innerText);
  const initialLangBtn = await page.$eval('#langToggle', el => el.innerText);
  console.log(`Initial Language: ${initialLangBtn}, Title: "${initialTitle.replace(/\n/g, ' ')}"`);

  // 2. Click Toggle Button -> Switch to Turkish
  console.log('Clicking #langToggle to switch to Turkish...');
  await page.click('#langToggle');
  await new Promise(r => setTimeout(r, 400));

  const trTitle = await page.$eval('h1', el => el.innerText);
  const trLangBtn = await page.$eval('#langToggle', el => el.innerText);
  const trHeroText = await page.$eval('.hero-text', el => el.innerText);
  const trOriginTitle = await page.$eval('#origin h2', el => el.innerText);
  const trStorage = await page.evaluate(() => localStorage.getItem('rynia-lang'));

  console.log(`Switched to TR: Button is now "${trLangBtn}"`);
  console.log(`TR Title: "${trTitle.replace(/\n/g, ' ')}"`);
  console.log(`TR Origin Title: "${trOriginTitle}"`);
  console.log(`TR Hero Text: "${trHeroText}"`);
  console.log(`LocalStorage: rynia-lang="${trStorage}"`);

  // Capture Turkish screenshot
  await page.screenshot({ path: path.resolve('test-artifacts/hero-turkish.png') });
  console.log('Captured test-artifacts/hero-turkish.png');

  // 3. Click Toggle Button again -> Switch back to English
  console.log('Clicking #langToggle to switch back to English...');
  await page.click('#langToggle');
  await new Promise(r => setTimeout(r, 400));

  const enTitle2 = await page.$eval('h1', el => el.innerText);
  const enLangBtn2 = await page.$eval('#langToggle', el => el.innerText);
  const enStorage2 = await page.evaluate(() => localStorage.getItem('rynia-lang'));

  console.log(`Switched to EN: Button is now "${enLangBtn2}"`);
  console.log(`EN Title: "${enTitle2.replace(/\n/g, ' ')}"`);
  console.log(`LocalStorage: rynia-lang="${enStorage2}"`);

  await browser.close();

  if (errors.length > 0) {
    console.error('Browser errors detected:', errors);
    process.exit(1);
  }

  if (!trTitle.includes('Elementlerin Dansı') || !trOriginTitle.includes('Kişisel Takma')) {
    console.error('Translation failed to apply text properly!');
    process.exit(1);
  }

  console.log('--- i18n Verification SUCCESSFUL ---');
}

testI18n().catch(err => {
  console.error('i18n test failed:', err);
  process.exit(1);
});
