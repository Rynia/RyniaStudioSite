import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const assetsDir = path.resolve('public/assets');

async function optimize() {
  console.log('Optimizing images in:', assetsDir);

  const logoPath = path.join(assetsDir, 'rynia-logo.png');
  if (fs.existsSync(logoPath)) {
    const backupLogo = path.join(assetsDir, 'rynia-logo-orig.png');
    if (!fs.existsSync(backupLogo)) fs.copyFileSync(logoPath, backupLogo);

    await sharp(backupLogo)
      .resize({ width: 300, withoutEnlargement: true })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(path.join(assetsDir, 'rynia-logo-temp.png'));

    fs.renameSync(path.join(assetsDir, 'rynia-logo-temp.png'), logoPath);
    const stat = fs.statSync(logoPath);
    console.log(`rynia-logo.png optimized: ${Math.round(stat.size / 1024)} KB`);
  }

  const posterPath = path.join(assetsDir, 'rynia-poster.png');
  const fallbackPath = path.join(assetsDir, 'hero-fallback.webp');
  
  if (fs.existsSync(posterPath)) {
    const backupPoster = path.join(assetsDir, 'rynia-poster-orig.png');
    if (!fs.existsSync(backupPoster)) fs.copyFileSync(posterPath, backupPoster);

    await sharp(backupPoster)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(fallbackPath);

    const stat = fs.statSync(fallbackPath);
    console.log(`hero-fallback.webp created: ${Math.round(stat.size / 1024)} KB`);

    await sharp(backupPoster)
      .resize({ width: 800, withoutEnlargement: true })
      .png({ quality: 85, compressionLevel: 9 })
      .toFile(path.join(assetsDir, 'rynia-poster-temp.png'));

    fs.renameSync(path.join(assetsDir, 'rynia-poster-temp.png'), posterPath);
    const posterStat = fs.statSync(posterPath);
    console.log(`rynia-poster.png optimized: ${Math.round(posterStat.size / 1024)} KB`);
  }

  console.log('--- Image Optimization Complete ---');
}

optimize().catch(console.error);
