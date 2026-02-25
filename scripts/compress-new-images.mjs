/**
 * Compress images from the /images folder into /public/portfolio-optimized/
 * Only processes image files (jpeg/jpg/png), skips non-photo files
 */
import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, parse } from 'path';

const INPUT_DIR = join(process.cwd(), 'images');
const OUTPUT_DIR = join(process.cwd(), 'public', 'portfolio-optimized');

const MAX_WIDTH = 1200;
const JPEG_QUALITY = 75;

// Skip non-photo files
const SKIP_FILES = ['Z-logo.png', 'animation logo video.mp4', 'gos.jpg', 'must dashboard.jpg'];

async function run() {
    await mkdir(OUTPUT_DIR, { recursive: true });

    const files = await readdir(INPUT_DIR);
    const imageFiles = files.filter(f =>
        /\.(jpe?g|png|webp)$/i.test(f) && !SKIP_FILES.includes(f)
    );

    console.log(`Found ${imageFiles.length} new images to compress`);
    let totalOriginal = 0;
    let totalCompressed = 0;

    for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const inputPath = join(INPUT_DIR, file);
        // Clean up filenames: replace spaces/parens with underscores
        const cleanName = parse(file).name
            .replace(/\s+/g, '_')
            .replace(/[()]/g, '')
            .replace(/__+/g, '_');
        const outputPath = join(OUTPUT_DIR, `${cleanName}.jpg`);

        try {
            const originalStat = await stat(inputPath);
            totalOriginal += originalStat.size;

            await sharp(inputPath)
                .resize({ width: MAX_WIDTH, withoutEnlargement: true })
                .jpeg({ quality: JPEG_QUALITY, progressive: true })
                .toFile(outputPath);

            const compressedStat = await stat(outputPath);
            totalCompressed += compressedStat.size;

            const savings = ((1 - compressedStat.size / originalStat.size) * 100).toFixed(1);
            console.log(
                `[${i + 1}/${imageFiles.length}] ${file} → ${cleanName}.jpg: ` +
                `${(originalStat.size / 1024).toFixed(0)}KB → ${(compressedStat.size / 1024).toFixed(0)}KB (${savings}% smaller)`
            );
        } catch (err) {
            console.error(`Error processing ${file}:`, err.message);
        }
    }

    console.log('\n--- Summary ---');
    console.log(`Original total: ${(totalOriginal / 1024).toFixed(0)} KB`);
    console.log(`Compressed total: ${(totalCompressed / 1024).toFixed(0)} KB`);
    console.log(`Output: ${OUTPUT_DIR}`);
}

run().catch(console.error);
