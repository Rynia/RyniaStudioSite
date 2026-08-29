import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('test-artifacts');

async function runTests() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--use-gl=angle']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  page.on('console', msg => console.log(`[Browser ${msg.type()}]: ${msg.text()}`));
  page.on('pageerror', err => console.error(`[Browser Error]: ${err.toString()}`));

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2500));

  // Desktop Hero
  await page.screenshot({ path: path.join(outDir, 'hero-desktop-v2.png'), clip: { x: 0, y: 0, width: 1440, height: 840 } });

  // Progressive scroll to trigger all reveals
  await page.evaluate(async () => {
    const totalHeight = document.body.scrollHeight;
    const distance = 400;
    let scrolled = 0;
    while (scrolled < totalHeight) {
      window.scrollBy(0, distance);
      scrolled += distance;
      await new Promise(resolve => setTimeout(resolve, 80));
    }
  });

  await new Promise(r => setTimeout(r, 600));

  // Capture Full Page Desktop
  await page.screenshot({ path: path.join(outDir, 'fullpage-desktop-v2.png'), fullPage: true });

  // Mobile Viewport
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));

  // Mobile Hero
  await page.screenshot({ path: path.join(outDir, 'hero-mobile-v2.png'), clip: { x: 0, y: 0, width: 390, height: 780 } });

  // Progressive scroll mobile
  await page.evaluate(async () => {
    const totalHeight = document.body.scrollHeight;
    const distance = 400;
    let scrolled = 0;
    while (scrolled < totalHeight) {
      window.scrollBy(0, distance);
      scrolled += distance;
      await new Promise(resolve => setTimeout(resolve, 80));
    }
  });
  await new Promise(r => setTimeout(r, 600));

  // Capture Full Page Mobile
  await page.screenshot({ path: path.join(outDir, 'fullpage-mobile-v2.png'), fullPage: true });

  await browser.close();
  console.log('--- Screenshots Captured ---');
}

runTests().catch(console.error);
