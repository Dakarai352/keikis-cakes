import sharp from 'sharp';
import path from 'path';

const files = [
  'image0 (18).jpeg',
  'image1 (7).jpeg',
  'image2 (6).jpeg',
  'image3 (4).jpeg'
];

const srcDir = 'c:\\Users\\Dakar\\OneDrive\\Website Testing\\Keikis Cak Website';
const dstDir = 'c:\\Users\\Dakar\\OneDrive\\Website Testing\\Keikis Cak Website\\keikis-cakes\\public\\images\\keikiscakesassets';

async function main() {
  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const destName = file.replace('.jpeg', '.webp');
    const destPath = path.join(dstDir, destName);
    await sharp(srcPath).rotate().webp({ quality: 82, effort: 4 }).toFile(destPath);
    console.log(`Converted ${file} to ${destName}`);
  }
}

main().catch(console.error);
