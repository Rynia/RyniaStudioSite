const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = 'C:\\Users\\TR\\Desktop\\kiler-kitchen-os\\assets';
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

// SVG for KALANLA Master Icon (Warm Tech 2.0 Gourmet Kitchen OS)
const iconSvg = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#26201B"/>
      <stop offset="70%" stop-color="#141210"/>
      <stop offset="100%" stop-color="#0B0A09"/>
    </radialGradient>
    <linearGradient id="potGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E85D3D"/>
      <stop offset="60%" stop-color="#D13A22"/>
      <stop offset="100%" stop-color="#8C1E10"/>
    </linearGradient>
    <linearGradient id="basilGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#16A34A"/>
      <stop offset="60%" stop-color="#22C55E"/>
      <stop offset="100%" stop-color="#4ADE80"/>
    </linearGradient>
    <linearGradient id="goldTrim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#B45309"/>
    </linearGradient>
    <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Background Layer -->
  <rect width="1024" height="1024" rx="228" fill="url(#bgGrad)"/>
  <rect width="1004" height="1004" x="10" y="10" rx="218" fill="none" stroke="#36302A" stroke-width="4" opacity="0.8"/>

  <!-- Emblem Group -->
  <g filter="url(#dropShadow)" transform="translate(512, 512)">
    <!-- Pot Body Base -->
    <path d="M-210,40 C-210,220 -150,290 0,290 C150,290 210,220 210,40 Z" fill="url(#potGrad)"/>
    
    <!-- Pot Rim -->
    <ellipse cx="0" cy="40" rx="226" ry="34" fill="#A62715" stroke="url(#goldTrim)" stroke-width="6"/>
    <ellipse cx="0" cy="38" rx="212" ry="24" fill="#421008"/>

    <!-- Pot Handles -->
    <path d="M-220,70 C-280,70 -300,140 -230,150 C-220,150 -210,140 -206,120" fill="none" stroke="url(#goldTrim)" stroke-width="22" stroke-linecap="round"/>
    <path d="M220,70 C280,70 300,140 230,150 C220,150 210,140 206,120" fill="none" stroke="url(#goldTrim)" stroke-width="22" stroke-linecap="round"/>

    <!-- Stylized Rising Basil Sprout (Sıfır Atık Kurtarma Filizi) -->
    <!-- Left Leaf -->
    <path d="M-10,20 C-110,-40 -150,-150 -60,-220 C-20,-170 -10,-80 -10,20 Z" fill="url(#basilGrad)"/>
    <!-- Right Leaf -->
    <path d="M5,20 C110,-20 160,-130 90,-200 C40,-160 10,-70 5,20 Z" fill="url(#basilGrad)" opacity="0.9"/>
    <!-- Center Sprout Shoot -->
    <path d="M-6,-20 C-12,-160 0,-260 0,-290 C6,-260 16,-160 4,-20 Z" fill="#86EFAC"/>

    <!-- Stylized Monogram 'K' Architectural Notch on Pot Front -->
    <path d="M-65,95 L-65,225 M-65,160 L15,95 M-30,140 L25,225" fill="none" stroke="#FDFBF7" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" opacity="0.92"/>
  </g>
</svg>
`;

// SVG for Adaptive Icon Foreground (Transparent background, safely inside 66% circle)
const adaptiveSvg = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="potGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E85D3D"/>
      <stop offset="60%" stop-color="#D13A22"/>
      <stop offset="100%" stop-color="#8C1E10"/>
    </linearGradient>
    <linearGradient id="basilGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#16A34A"/>
      <stop offset="60%" stop-color="#22C55E"/>
      <stop offset="100%" stop-color="#4ADE80"/>
    </linearGradient>
    <linearGradient id="goldTrim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#B45309"/>
    </linearGradient>
    <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="14" stdDeviation="20" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Scaled emblem fitting within Android adaptive icon 66% safe viewport -->
  <g filter="url(#dropShadow)" transform="translate(512, 530) scale(0.72)">
    <path d="M-210,40 C-210,220 -150,290 0,290 C150,290 210,220 210,40 Z" fill="url(#potGrad)"/>
    <ellipse cx="0" cy="40" rx="226" ry="34" fill="#A62715" stroke="url(#goldTrim)" stroke-width="6"/>
    <ellipse cx="0" cy="38" rx="212" ry="24" fill="#421008"/>
    <path d="M-220,70 C-280,70 -300,140 -230,150 C-220,150 -210,140 -206,120" fill="none" stroke="url(#goldTrim)" stroke-width="22" stroke-linecap="round"/>
    <path d="M220,70 C280,70 300,140 230,150 C220,150 210,140 206,120" fill="none" stroke="url(#goldTrim)" stroke-width="22" stroke-linecap="round"/>
    <path d="M-10,20 C-110,-40 -150,-150 -60,-220 C-20,-170 -10,-80 -10,20 Z" fill="url(#basilGrad)"/>
    <path d="M5,20 C110,-20 160,-130 90,-200 C40,-160 10,-70 5,20 Z" fill="url(#basilGrad)" opacity="0.9"/>
    <path d="M-6,-20 C-12,-160 0,-260 0,-290 C6,-260 16,-160 4,-20 Z" fill="#86EFAC"/>
    <path d="M-65,95 L-65,225 M-65,160 L15,95 M-30,140 L25,225" fill="none" stroke="#FDFBF7" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" opacity="0.92"/>
  </g>
</svg>
`;

// SVG for Google Play Store Feature Graphic (1024x500 Banner)
const bannerSvg = `
<svg width="1024" height="500" viewBox="0 0 1024 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bannerBg" cx="30%" cy="50%" r="80%">
      <stop offset="0%" stop-color="#26201B"/>
      <stop offset="60%" stop-color="#141210"/>
      <stop offset="100%" stop-color="#080806"/>
    </radialGradient>
    <linearGradient id="potGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E85D3D"/>
      <stop offset="60%" stop-color="#D13A22"/>
      <stop offset="100%" stop-color="#8C1E10"/>
    </linearGradient>
    <linearGradient id="basilGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#16A34A"/>
      <stop offset="60%" stop-color="#22C55E"/>
      <stop offset="100%" stop-color="#4ADE80"/>
    </linearGradient>
    <linearGradient id="goldTrim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#B45309"/>
    </linearGradient>
  </defs>

  <rect width="1024" height="500" fill="url(#bannerBg)"/>
  
  <!-- Subtle decorative grid & rings -->
  <circle cx="280" cy="250" r="210" fill="none" stroke="#36302A" stroke-width="1.5" stroke-dasharray="4,6" opacity="0.6"/>
  <circle cx="280" cy="250" r="260" fill="none" stroke="#22C55E" stroke-width="1" stroke-dasharray="2,8" opacity="0.3"/>

  <!-- Left Emblem (Icon scaled) -->
  <g transform="translate(280, 260) scale(0.48)">
    <path d="M-210,40 C-210,220 -150,290 0,290 C150,290 210,220 210,40 Z" fill="url(#potGrad)"/>
    <ellipse cx="0" cy="40" rx="226" ry="34" fill="#A62715" stroke="url(#goldTrim)" stroke-width="6"/>
    <ellipse cx="0" cy="38" rx="212" ry="24" fill="#421008"/>
    <path d="M-220,70 C-280,70 -300,140 -230,150 C-220,150 -210,140 -206,120" fill="none" stroke="url(#goldTrim)" stroke-width="22" stroke-linecap="round"/>
    <path d="M220,70 C280,70 300,140 230,150 C220,150 210,140 206,120" fill="none" stroke="url(#goldTrim)" stroke-width="22" stroke-linecap="round"/>
    <path d="M-10,20 C-110,-40 -150,-150 -60,-220 C-20,-170 -10,-80 -10,20 Z" fill="url(#basilGrad)"/>
    <path d="M5,20 C110,-20 160,-130 90,-200 C40,-160 10,-70 5,20 Z" fill="url(#basilGrad)" opacity="0.9"/>
    <path d="M-6,-20 C-12,-160 0,-260 0,-290 C6,-260 16,-160 4,-20 Z" fill="#86EFAC"/>
    <path d="M-65,95 L-65,225 M-65,160 L15,95 M-30,140 L25,225" fill="none" stroke="#FDFBF7" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" opacity="0.92"/>
  </g>

  <!-- Right Typography & Value Prop -->
  <g transform="translate(480, 160)">
    <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#22C55E" letter-spacing="4">RYNIA STUDIOS // KITCHEN OS</text>
    <text x="0" y="64" font-family="system-ui, -apple-system, sans-serif" font-size="54" font-weight="900" fill="#FDFBF7" letter-spacing="-1">KALANLA</text>
    <text x="0" y="112" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="600" fill="#E85D3D">"Ne kaldıysa, ondan başla."</text>
    
    <text x="0" y="160" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#D6D3D1">Sıfır Atık Kiler Envanteri • Akıllı Kurtarma Tarifleri</text>
    <text x="0" y="188" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#D6D3D1">Yerel Veri Modeli • 2026 Dürüm Endeksi</text>

    <!-- Badge Pills -->
    <rect x="0" y="220" width="130" height="32" rx="16" fill="#1E1B18" stroke="#36302A" stroke-width="1"/>
    <text x="65" y="241" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#22C55E" text-anchor="middle">✓ %100 YEREL</text>

    <rect x="142" y="220" width="150" height="32" rx="16" fill="#1E1B18" stroke="#36302A" stroke-width="1"/>
    <text x="217" y="241" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#F59E0B" text-anchor="middle">☕ SIFIR REKLAM</text>
  </g>
</svg>
`;

async function buildAssets() {
  const iconBuf = Buffer.from(iconSvg);
  const adaptiveBuf = Buffer.from(adaptiveSvg);
  const bannerBuf = Buffer.from(bannerSvg);

  await sharp(iconBuf).resize(1024, 1024).png().toFile(path.join(targetDir, 'icon.png'));
  await sharp(adaptiveBuf).resize(1024, 1024).png().toFile(path.join(targetDir, 'adaptive-icon.png'));
  await sharp(adaptiveBuf).resize(512, 512).png().toFile(path.join(targetDir, 'splash-icon.png'));
  await sharp(iconBuf).resize(64, 64).png().toFile(path.join(targetDir, 'favicon.png'));

  // Also build Google Play Store Listing Specific Assets (Play Store Storefront folder)
  const storeDir = 'C:\\Users\\TR\\Desktop\\kiler-kitchen-os\\store-assets';
  if (!fs.existsSync(storeDir)) fs.mkdirSync(storeDir, { recursive: true });

  await sharp(iconBuf).resize(512, 512).png().toFile(path.join(storeDir, 'play-store-icon-512.png'));
  await sharp(bannerBuf).resize(1024, 500).png().toFile(path.join(storeDir, 'play-store-feature-graphic-1024x500.png'));

  console.log('KALANLA icon & Play Store assets generated successfully!');
}

buildAssets().catch(err => {
  console.error('Build error:', err);
  process.exit(1);
});
