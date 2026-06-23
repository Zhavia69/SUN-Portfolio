const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../public/assets/images/logo2.png');
const publicDir = path.join(__dirname, '../public');
const assetsImagesDir = path.join(__dirname, '../public/assets/images');

async function processImages() {
  if (!fs.existsSync(inputPath)) {
    console.error('Error: logo2.png not found at', inputPath);
    return;
  }

  try {
    console.log('Processing images...');
    
    // 1. Open Graph Image (1200x630)
    await sharp(inputPath)
      .resize({
        width: 1200,
        height: 630,
        fit: 'contain',
        background: { r: 10, g: 15, b: 30, alpha: 1 } // Dark background from portfolio theme (#0a0f1e)
      })
      .toFile(path.join(assetsImagesDir, 'og-image.png'));
    console.log('Generated og-image.png (1200x630)');

    // 2. Apple Touch Icon (180x180)
    await sharp(inputPath)
      .resize(180, 180, {
        fit: 'contain',
        background: { r: 10, g: 15, b: 30, alpha: 1 }
      })
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('Generated apple-touch-icon.png (180x180)');

    // 3. Favicon (32x32)
    // Note: saving as PNG but named .ico since modern browsers support PNG for favicons
    await sharp(inputPath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 } // transparent
      })
      .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('Generated favicon.ico (32x32)');
    
    console.log('All images optimized successfully.');
  } catch (err) {
    console.error('Error processing images:', err);
  }
}

processImages();
