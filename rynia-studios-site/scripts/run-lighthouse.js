import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('test-artifacts');

async function runLighthouseAudit() {
  console.log('--- Launching Chrome for Lighthouse ---');
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox']
  });

  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port
  };

  console.log('Running Mobile Audit (emulated mobile)...');
  const mobileRunnerResult = await lighthouse('http://localhost:4173/', {
    ...options,
    formFactor: 'mobile',
    screenEmulation: {
      mobile: true,
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      disabled: false
    }
  });

  const mobileReport = JSON.parse(mobileRunnerResult.report);
  const mobileScores = {
    performance: Math.round(mobileReport.categories.performance.score * 100),
    accessibility: Math.round(mobileReport.categories.accessibility.score * 100),
    bestPractices: Math.round(mobileReport.categories['best-practices'].score * 100),
    seo: Math.round(mobileReport.categories.seo.score * 100)
  };

  console.log('Mobile Scores:', mobileScores);

  console.log('Running Desktop Audit...');
  const desktopRunnerResult = await lighthouse('http://localhost:4173/', {
    ...options,
    formFactor: 'desktop',
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false
    }
  });

  const desktopReport = JSON.parse(desktopRunnerResult.report);
  const desktopScores = {
    performance: Math.round(desktopReport.categories.performance.score * 100),
    accessibility: Math.round(desktopReport.categories.accessibility.score * 100),
    bestPractices: Math.round(desktopReport.categories['best-practices'].score * 100),
    seo: Math.round(desktopReport.categories.seo.score * 100)
  };

  console.log('Desktop Scores:', desktopScores);

  try {
    await chrome.kill();
  } catch (e) {
    // Ignore windows temp cleanup permission warnings
  }


  const finalResults = {
    mobile: mobileScores,
    desktop: desktopScores,
    metrics: {
      mobileFCP: mobileReport.audits['first-contentful-paint']?.displayValue,
      mobileLCP: mobileReport.audits['largest-contentful-paint']?.displayValue,
      mobileTBT: mobileReport.audits['total-blocking-time']?.displayValue,
      mobileCLS: mobileReport.audits['cumulative-layout-shift']?.displayValue,
      desktopFCP: desktopReport.audits['first-contentful-paint']?.displayValue,
      desktopLCP: desktopReport.audits['largest-contentful-paint']?.displayValue,
      desktopTBT: desktopReport.audits['total-blocking-time']?.displayValue,
      desktopCLS: desktopReport.audits['cumulative-layout-shift']?.displayValue
    }
  };

  fs.writeFileSync(path.join(outDir, 'lighthouse-summary.json'), JSON.stringify(finalResults, null, 2));
  console.log('--- Lighthouse Audit Completed ---');
}

runLighthouseAudit().catch(err => {
  console.error('Lighthouse audit error:', err);
  process.exit(1);
});
