#!/usr/bin/env node

/**
 * Cloudinary Image Migration Script
 *
 * Migrates images from the current Soul Miner's Eden website to Cloudinary
 *
 * Features:
 * - Downloads images from current site
 * - Uploads to Cloudinary with organized folder structure
 * - Generates mapping file for URL updates
 * - Handles errors and retries
 *
 * Usage:
 *   node scripts/migrate-images.js
 *
 * Requirements:
 * - CLOUDINARY_URL environment variable or individual credentials
 * - Source JSON file with product data
 */

const fs = require('fs').promises;
const path = require('path');
const https = require('https');
const http = require('http');
const cloudinary = require('cloudinary').v2;

// Configuration
const CLOUDINARY_CLOUD_NAME = process.env.PUBLIC_CLOUDINARY_CLOUD_NAME || 'southland-organics';
const CLOUDINARY_API_KEY = process.env.PUBLIC_CLOUDINARY_API_KEY || '246196521633339';
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || 'vQLdl6oOHdhvLgQqC8CnfqAxjAY';
const CLOUDINARY_FOLDER = process.env.PUBLIC_CLOUDINARY_FOLDER || "Soul Miner's";

// Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

// Temporary directory for downloaded images
const TEMP_DIR = path.join(process.cwd(), 'temp-images');

// Output mapping file
const MAPPING_FILE = path.join(process.cwd(), 'image-url-mapping.json');

/**
 * Download image from URL
 */
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const file = require('fs').createWriteStream(filepath);

    protocol
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
          return;
        }

        response.pipe(file);

        file.on('finish', () => {
          file.close(() => resolve(filepath));
        });
      })
      .on('error', (err) => {
        require('fs').unlink(filepath, () => {});
        reject(err);
      });
  });
}

/**
 * Upload image to Cloudinary
 */
async function uploadToCloudinary(filePath, publicId) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      folder: CLOUDINARY_FOLDER,
      overwrite: false,
      resource_type: 'image',
      use_filename: true,
      unique_filename: true,
    });

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Extract images from current site
 * This will be updated based on actual source data structure
 */
async function extractImagesFromSource() {
  // TODO: Update this based on actual data source
  // For now, return placeholder structure

  return [
    // Products
    {
      category: 'products/compost',
      name: 'certified-organic-compost',
      sourceUrl: 'https://example.com/images/compost.jpg',
    },
    {
      category: 'products/mulch',
      name: 'hardwood-mulch',
      sourceUrl: 'https://example.com/images/mulch.jpg',
    },
    {
      category: 'products/soil',
      name: 'garden-soil',
      sourceUrl: 'https://example.com/images/soil.jpg',
    },
    // Farm/About
    {
      category: 'farm',
      name: 'farm-overview',
      sourceUrl: 'https://example.com/images/farm.jpg',
    },
    // Services
    {
      category: 'services',
      name: 'grazing-services',
      sourceUrl: 'https://example.com/images/grazing.jpg',
    },
  ];
}

/**
 * Main migration function
 */
async function migrateImages() {
  console.log('🚀 Starting image migration to Cloudinary...\n');
  console.log(`Cloud: ${CLOUDINARY_CLOUD_NAME}`);
  console.log(`Folder: ${CLOUDINARY_FOLDER}\n`);

  // Create temp directory
  try {
    await fs.mkdir(TEMP_DIR, { recursive: true });
    console.log(`✅ Created temporary directory: ${TEMP_DIR}\n`);
  } catch (error) {
    console.error('❌ Failed to create temp directory:', error);
    process.exit(1);
  }

  // Extract images from source
  console.log('📋 Extracting images from source...');
  const images = await extractImagesFromSource();
  console.log(`Found ${images.length} images to migrate\n`);

  // Migration results
  const mapping = [];
  let successCount = 0;
  let failureCount = 0;

  // Process each image
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const { category, name, sourceUrl } = image;

    console.log(`[${i + 1}/${images.length}] Processing: ${name}`);

    try {
      // Download image
      const ext = path.extname(sourceUrl) || '.jpg';
      const filename = `${name}${ext}`;
      const tempPath = path.join(TEMP_DIR, filename);

      console.log(`  ⬇️  Downloading from: ${sourceUrl}`);
      await downloadImage(sourceUrl, tempPath);

      // Upload to Cloudinary
      const publicId = `${category}/${name}`;
      console.log(`  ⬆️  Uploading to: ${publicId}`);

      const result = await uploadToCloudinary(tempPath, publicId);

      if (result.success) {
        console.log(`  ✅ Success: ${result.url}\n`);

        mapping.push({
          original: sourceUrl,
          cloudinary: result.url,
          publicId: result.publicId,
          category,
          name,
          dimensions: {
            width: result.width,
            height: result.height,
          },
        });

        successCount++;
      } else {
        console.log(`  ❌ Failed: ${result.error}\n`);
        failureCount++;
      }

      // Clean up temp file
      await fs.unlink(tempPath).catch(() => {});
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}\n`);
      failureCount++;
    }
  }

  // Save mapping file
  console.log('\n💾 Saving URL mapping...');
  await fs.writeFile(MAPPING_FILE, JSON.stringify(mapping, null, 2));
  console.log(`✅ Mapping saved to: ${MAPPING_FILE}`);

  // Clean up temp directory
  console.log('\n🧹 Cleaning up...');
  await fs.rmdir(TEMP_DIR, { recursive: true }).catch(() => {});

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Migration Summary');
  console.log('='.repeat(50));
  console.log(`Total images: ${images.length}`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failureCount}`);
  console.log('='.repeat(50));

  if (successCount > 0) {
    console.log('\n✨ Migration complete!');
    console.log(`\nNext steps:`);
    console.log(`1. Review ${MAPPING_FILE} for URL mappings`);
    console.log(`2. Update product data with new Cloudinary public IDs`);
    console.log(`3. Test images in components using CloudinaryImage component`);
  }
}

// Run migration
if (require.main === module) {
  migrateImages().catch((error) => {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  });
}

module.exports = { migrateImages, downloadImage, uploadToCloudinary };
