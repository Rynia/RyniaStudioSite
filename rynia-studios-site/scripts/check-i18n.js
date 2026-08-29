import fs from 'fs';
import path from 'path';

const en = JSON.parse(fs.readFileSync('src/i18n/en.json', 'utf8'));
const tr = JSON.parse(fs.readFileSync('src/i18n/tr.json', 'utf8'));
const html = fs.readFileSync('index.html', 'utf8');

console.log('--- Checking Key Discrepancies between en.json and tr.json ---');
const enKeys = new Set();
const trKeys = new Set();

for (const sec in en) {
  for (const k in en[sec]) enKeys.add(`${sec}.${k}`);
}
for (const sec in tr) {
  for (const k in tr[sec]) trKeys.add(`${sec}.${k}`);
}

const missingInTr = [...enKeys].filter(k => !trKeys.has(k));
const missingInEn = [...trKeys].filter(k => !enKeys.has(k));

console.log('Missing in tr.json:', missingInTr);
console.log('Missing in en.json:', missingInEn);

console.log('\n--- Checking HTML data-i18n attributes ---');
const regex = /data-i18n="([^"]+)"/g;
let match;
const htmlKeys = new Set();
while ((match = regex.exec(html)) !== null) {
  htmlKeys.add(match[1]);
}

const missingFromEnDict = [...htmlKeys].filter(k => !enKeys.has(k));
const missingFromTrDict = [...htmlKeys].filter(k => !trKeys.has(k));

console.log('HTML keys missing in en.json:', missingFromEnDict);
console.log('HTML keys missing in tr.json:', missingFromTrDict);
