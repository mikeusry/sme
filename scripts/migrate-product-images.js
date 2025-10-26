#!/usr/bin/env node

/**
 * Product Image Migration to Cloudinary
 *
 * Uploads local product images from Soul Miner's Website folder to Cloudinary
 *
 * Usage: node scripts/migrate-product-images.js
 */

const fs = require('fs').promises;
const path = require('path');
const cloudinary = require('cloudinary').v2;

// Configuration
const CLOUDINARY_CLOUD_NAME = process.env.PUBLIC_CLOUDINARY_CLOUD_NAME || 'southland-organics';
const CLOUDINARY_API_KEY = process.env.PUBLIC_CLOUDINARY_API_KEY || '246196521633339';
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || 'vQLdl6oOHdhvLgQqC8CnfqAxjAY';
const CLOUDINARY_FOLDER = process.env.PUBLIC_CLOUDINARY_FOLDER || "Soul Miner's";

// Source directory
const SOURCE_DIR = '/Users/mikeusry/Desktop/Southland In Progress/Soul Miner\'s Website/Soils & Mulch';

// Output mapping file
const MAPPING_FILE = path.join(process.cwd(), 'image-url-mapping.json');

// Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Image mappings based on products.json
 */
const IMAGE_MAPPINGS = [
  // COMPOST
  { local: 'TOPO_compost.jpg', cloudinary: 'products/compost/TOPO_compost.jpg', category: 'compost' },
  { local: 'compost-action.jpg', cloudinary: 'products/compost/compost-action.jpg', category: 'compost' },
  { local: 'compost-blend.jpg', cloudinary: 'products/compost/compost-blend.jpg', category: 'compost' },

  // MULCH
  { local: 'TOPO_natural.jpg', cloudinary: 'products/mulch/TOPO_natural.jpg', category: 'mulch' },
  { local: 'natural-mulch-action.jpg', cloudinary: 'products/mulch/natural-mulch-action.jpg', category: 'mulch' },
  { local: 'TOPO_brown.jpg', cloudinary: 'products/mulch/TOPO_brown.jpg', category: 'mulch' },
  { local: 'brown-mulch.jpg', cloudinary: 'products/mulch/brown-mulch.jpg', category: 'mulch' },
  { local: 'brown-mulch-action.jpg', cloudinary: 'products/mulch/brown-mulch-action.jpg', category: 'mulch' },
  { local: 'TOPO_pinebark.jpg', cloudinary: 'products/mulch/TOPO_pinebark.jpg', category: 'mulch' },
  { local: 'TOPO_black.jpg', cloudinary: 'products/mulch/TOPO_black.jpg', category: 'mulch' },
  { local: 'black-mulch.jpg', cloudinary: 'products/mulch/black-mulch.jpg', category: 'mulch' },
  { local: 'black-mulch-application.jpg', cloudinary: 'products/mulch/black-mulch-application.jpg', category: 'mulch' },
  { local: 'red-mulch.jpg', cloudinary: 'products/mulch/red-mulch.jpg', category: 'mulch' },
  { local: 'red-mulch-application.jpg', cloudinary: 'products/mulch/red-mulch-application.jpg', category: 'mulch' },
  { local: 'TOPO_single.jpg', cloudinary: 'products/mulch/TOPO_single.jpg', category: 'mulch' },
  { local: 'TOPO_woodchips.jpg', cloudinary: 'products/mulch/TOPO_woodchips.jpg', category: 'mulch' },

  // SOIL
  { local: 'TOPO_topsoil.jpg', cloudinary: 'products/soil/TOPO_topsoil.jpg', category: 'soil' },
  { local: 'top-soil-action.jpg', cloudinary: 'products/soil/top-soil-action.jpg', category: 'soil' },
  { local: 'bioretention-soil-0.jpg', cloudinary: 'products/soil/bioretention-soil-0.jpg', category: 'soil' },
  { local: 'bioretention-soil-1.jpg', cloudinary: 'products/soil/bioretention-soil-1.jpg', category: 'soil' },
  { local: 'bioretention-soil-10.jpg', cloudinary: 'products/soil/bioretention-soil-10.jpg', category: 'soil' },
  { local: 'sod-soil.jpg', cloudinary: 'products/soil/sod-soil.jpg', category: 'soil' },

  // SPECIALTY
  { local: 'topsoil-compost.jpg', cloudinary: 'products/specialty/topsoil-compost.jpg', category: 'specialty' },
];

/**
 * Upload image to Cloudinary
 */
async function uploadToCloudinary(localPath, publicId) {
  try {
    const result = await cloudinary.uploader.upload(localPath, {
      public_id: publicId,
      folder: CLOUDINARY_FOLDER,
      overwrite: false,
      resource_type: 'image',
      use_filename: false,
      unique_filename: false,
    });

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
    };
  } catch (error) {
    // If already exists, that's okay
    if (error.http_code === 400 && error.message && error.message.includes('already exists')) {
      console.log(`    ℹ️  Already exists, skipping...`);
      return {
        success: true,
        skipped: true,
        message: 'Already exists in Cloudinary'
      };
    }

    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Main migration function
 */
async function migrateImages() {
  console.log('🚀 Starting product image migration to Cloudinary...\n');
  console.log(`Cloud: ${CLOUDINARY_CLOUD_NAME}`);
  console.log(`Folder: ${CLOUDINARY_FOLDER}`);
  console.log(`Source: ${SOURCE_DIR}\n`);

  // Migration results
  const mapping = [];
  let successCount = 0;
  let skipCount = 0;
  let failureCount = 0;

  console.log(`📋 Migrating ${IMAGE_MAPPINGS.length} product images...\n`);

  // Process each image
  for (let i = 0; i < IMAGE_MAPPINGS.length; i++) {
    const imageMap = IMAGE_MAPPINGS[i];
    const { local, cloudinary: cloudinaryPath, category } = imageMap;

    console.log(`[${i + 1}/${IMAGE_MAPPINGS.length}] ${local}`);

    try {
      // Check if local file exists
      const localPath = path.join(SOURCE_DIR, local);

      try {
        await fs.access(localPath);
      } catch (err) {
        console.log(`  ⚠️  File not found locally, skipping\n`);
        failureCount++;
        continue;
      }

      // Upload to Cloudinary
      console.log(`  ⬆️  Uploading to: ${cloudinaryPath}`);

      const result = await uploadToCloudinary(localPath, cloudinaryPath);

      if (result.success) {
        if (result.skipped) {
          skipCount++;
        } else {
          console.log(`  ✅ Success: ${result.url}`);
          console.log(`     ${result.width}x${result.height} - ${Math.round(result.bytes / 1024)}KB\n`);

          mapping.push({
            local: local,
            cloudinary: result.url,
            publicId: result.publicId,
            category,
            dimensions: {
              width: result.width,
              height: result.height,
            },
            sizeKB: Math.round(result.bytes / 1024),
          });

          successCount++;
        }
      } else {
        console.log(`  ❌ Failed: ${result.error}\n`);
        failureCount++;
      }

    } catch (error) {
      console.log(`  ❌ Error: ${error.message}\n`);
      failureCount++;
    }
  }

  // Save mapping file
  console.log('\n💾 Saving URL mapping...');
  await fs.writeFile(MAPPING_FILE, JSON.stringify(mapping, null, 2));
  console.log(`✅ Mapping saved to: ${MAPPING_FILE}`);

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Migration Summary');
  console.log('='.repeat(50));
  console.log(`Total images: ${IMAGE_MAPPINGS.length}`);
  console.log(`✅ Uploaded: ${successCount}`);
  console.log(`ℹ️  Skipped (already exist): ${skipCount}`);
  console.log(`❌ Failed: ${failureCount}`);
  console.log('='.repeat(50));

  if (successCount > 0 || skipCount > 0) {
    console.log('\n✨ Migration complete!');
    console.log(`\nNext steps:`);
    console.log(`1. Review ${MAPPING_FILE} for URL mappings`);
    console.log(`2. Product images are now available via Cloudinary`);
    console.log(`3. Use CloudinaryImage components with public IDs like:`);
    console.log(`   - products/compost/TOPO_compost.jpg`);
    console.log(`   - products/mulch/brown-mulch.jpg`);
    console.log(`   - products/soil/bioretention-soil-0.jpg`);
  }
}

// Run migration
if (require.main === module) {
  migrateImages().catch((error) => {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  });
}

module.exports = { migrateImages };
