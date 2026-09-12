const fs = require('fs');
const path = require('path');

const tempDir = path.resolve('temp_press_kit');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
fs.mkdirSync(path.join(tempDir, 'brand'), { recursive: true });
fs.mkdirSync(path.join(tempDir, 'projects', 'kalanla'), { recursive: true });
fs.mkdirSync(path.join(tempDir, 'projects', 'kombo-kart'), { recursive: true });

const factsheet = `================================================================================
RYNIA STUDIOS — OFFICIAL FACTSHEET (MMXXVI)
================================================================================

1. ATELIER IDENTITY
--------------------------------------------------------------------------------
Studio Name: Rynia Studios
Provenance: Est. 2019 (Independent Atelier)
Discipline: Strategic Games, Intelligent Everyday Tools, Digital Craft
Location: Global / Distributed
Website: https://ryniastudios.netlify.app
Inquiries: ryniastudios@gmail.com
Discord: https://discord.gg/HJ4hRrZcz
X / Twitter: https://x.com/RyniaStudio
Instagram: https://www.instagram.com/ryniastudio/
YouTube: https://www.youtube.com/@RyniaStudio

2. ACTIVE PRODUCTIONS
--------------------------------------------------------------------------------
A. KOMBO KART
Genre: Mobile Auto-Battler Card Strategy
Platform: iOS / Android (In Development)
Core Mechanics:
  - Strict agency drafting under severe card scarcity
  - Elemental resonance matrix (Fire, Frost, Earth, Arcane)
  - Spatial 2-row positioning determining aggro, flanking, and protection
  - Deterministic tick-rate clash resolution

B. KALANLA (Kitchen Operating System)
Platform: Android APK (V1.0 Stable)
Core Mechanics:
  - Algorithmic shelf-life pantry matching
  - Zero-waste recipe generation engine
  - Offline-first SQLite local architecture
  - Economic waste-to-value ratio calculation (Dürüm Index)

3. ATELIER PHILOSOPHY
--------------------------------------------------------------------------------
- Systems before spectacle: Mathematical balance precedes surface polish.
- Iteration before assumption: Ground truth telemetry guides evolution.
- Longevity before noise: Built to endure, respecting human agency.

(C) 2019-2026 Rynia Studios. All Rights Reserved.
`;

fs.writeFileSync(path.join(tempDir, 'RYNIA_STUDIOS_FACTSHEET.txt'), factsheet, 'utf-8');

function copyIf(src, dest) {
  if (fs.existsSync(src)) fs.copyFileSync(src, dest);
}

copyIf('public/assets/rynia-logo.png', path.join(tempDir, 'brand', 'rynia-logo.png'));
copyIf('public/assets/rynia-poster.png', path.join(tempDir, 'brand', 'rynia-poster.png'));
copyIf('public/assets/projects/kalanla/kalanla-pantry-core.webp', path.join(tempDir, 'projects', 'kalanla', 'kalanla-pantry-core.webp'));
copyIf('public/assets/projects/kombo-kart/phoenix-cinder.webp', path.join(tempDir, 'projects', 'kombo-kart', 'phoenix-cinder.webp'));
copyIf('public/assets/projects/kombo-kart/glacial-aegis.webp', path.join(tempDir, 'projects', 'kombo-kart', 'glacial-aegis.webp'));
copyIf('public/assets/projects/kombo-kart/ironroot-warden.webp', path.join(tempDir, 'projects', 'kombo-kart', 'ironroot-warden.webp'));

console.log('Copied files to temp_press_kit');
