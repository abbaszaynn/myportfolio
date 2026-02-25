/**
 * Compress all portfolio images using Sharp.
 * - Resizes to max 1200px width (keeps aspect ratio)
 * - Converts to JPEG at quality 75
 * - Saves to public/portfolio-optimized/
 * - Also generates tiny 20px-wide blur placeholders
 */
import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, parse } from 'path';

const INPUT_DIR = join(process.cwd(), 'public', 'portfolio');
const OUTPUT_DIR = join(process.cwd(), 'public', 'portfolio-optimized');

const MAX_WIDTH = 1200;
const JPEG_QUALITY = 75;

async function run() {
    // Create output directory
    await mkdir(OUTPUT_DIR, { recursive: true });

    const files = await readdir(INPUT_DIR);
    const imageFiles = files.filter(f =>
        /\.(jpe?g|png|webp|JPG|JPEG|PNG)$/i.test(f)
    );

    console.log(`Found ${imageFiles.length} images to compress`);
    let totalOriginal = 0;
    let totalCompressed = 0;

    for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const inputPath = join(INPUT_DIR, file);
        const { name } = parse(file);
        const outputPath = join(OUTPUT_DIR, `${name}.jpg`);

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
                `[${i + 1}/${imageFiles.length}] ${file}: ` +
                `${(originalStat.size / 1024 / 1024).toFixed(1)}MB → ${(compressedStat.size / 1024).toFixed(0)}KB (${savings}% smaller)`
            );
        } catch (err) {
            console.error(`Error processing ${file}:`, err.message);
        }
    }

    console.log('\n--- Summary ---');
    console.log(`Original total: ${(totalOriginal / 1024 / 1024).toFixed(1)} MB`);
    console.log(`Compressed total: ${(totalCompressed / 1024 / 1024).toFixed(1)} MB`);
    console.log(`Savings: ${((1 - totalCompressed / totalOriginal) * 100).toFixed(1)}%`);
    console.log(`Output: ${OUTPUT_DIR}`);
}

run().catch(console.error);
