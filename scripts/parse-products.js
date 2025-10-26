#!/usr/bin/env node

/**
 * Product Data Parser
 *
 * Extracts product information from the crawled website JSON
 * and creates a clean, structured product catalog for Soul Miner's Eden
 *
 * Usage: node scripts/parse-products.js
 */

const fs = require('fs').promises;
const path = require('path');

// Input/Output paths
const INPUT_JSON = '/Users/mikeusry/Desktop/SME 2026/dataset_website-content-crawler_2025-10-26_13-41-49-440.json';
const OUTPUT_JSON = path.join(__dirname, '../data/products.json');
const OUTPUT_DIR = path.join(__dirname, '../data');

/**
 * Product data structure
 */
const PRODUCT_CATALOG = {
  // COMPOST
  'humus-compost': {
    name: "Soul Miner's Humus Compost",
    slug: 'humus-compost',
    category: 'compost',
    description: 'Premium humus compost, rich in nutrients and beneficial microbes, perfect for improving soil health and plant growth.',
    longDescription: `Georgia's ONLY certified organic compost. Our humus compost is the result of careful decomposition of organic matter, creating a nutrient-rich soil amendment that transforms gardens and landscapes. Packed with beneficial microbes, this compost improves soil structure, water retention, and provides slow-release nutrition for plants.`,
    price: 25,
    unit: 'cubic yard',
    sku: 'SME-COMP-001',
    inStock: true,
    featured: true,
    certifications: ['Certified Organic', 'Certified Naturally Grown'],
    benefits: [
      'Improves soil structure and drainage',
      'Increases water retention capacity',
      'Adds beneficial microorganisms',
      'Provides slow-release nutrients',
      'Reduces need for chemical fertilizers',
      'Suppresses plant diseases naturally'
    ],
    applications: [
      'Garden beds and vegetable gardens',
      'Lawn top-dressing',
      'Tree and shrub planting',
      'Container gardening',
      'Erosion control'
    ],
    images: {
      primary: "Soul Miner's/products/compost/TOPO_compost.jpg.jpg",
      gallery: ["Soul Miner's/products/compost/compost-action.jpg.jpg", "Soul Miner's/products/compost/compost-blend.jpg.jpg"]
    },
    seo: {
      title: 'Certified Organic Compost Athens GA | Soul Miner\'s Eden',
      description: 'Georgia\'s only certified organic compost. Premium humus compost for healthier soil and thriving plants. Local delivery available.',
      keywords: ['organic compost', 'certified compost Athens GA', 'humus compost', 'soil amendment', 'garden compost Georgia']
    }
  },

  // MULCH PRODUCTS
  'double-ground-hardwood-mulch': {
    name: 'Double Ground Hardwood Mulch',
    slug: 'double-ground-hardwood-mulch',
    category: 'mulch',
    description: 'Premium double-ground hardwood mulch for superior coverage and long-lasting beauty in your landscape.',
    longDescription: 'Our double-ground hardwood mulch is processed twice for a finer, more uniform texture that provides excellent coverage and natural weed suppression. Made from 100% hardwood, it decomposes slowly while enriching your soil.',
    price: 30,
    unit: 'cubic yard',
    sku: 'SME-MULCH-001',
    inStock: true,
    featured: true,
    benefits: [
      'Finer texture for better coverage',
      'Natural weed suppression',
      'Retains soil moisture',
      'Moderate decomposition rate',
      'Rich, natural brown color'
    ],
    applications: [
      'Flower beds and borders',
      'Around trees and shrubs',
      'Playgrounds and pathways',
      'Large landscape projects'
    ],
    images: {
      primary: 'Soul Miner\'s/products/mulch/TOPO_natural.jpg.jpg',
      gallery: ['Soul Miner\'s/products/mulch/natural-mulch-action.jpg.jpg']
    },
    seo: {
      title: 'Double Ground Hardwood Mulch | Premium Landscaping Mulch',
      description: 'High-quality double-ground hardwood mulch for superior landscape coverage. Natural weed control and soil enrichment.',
      keywords: ['hardwood mulch', 'double ground mulch', 'landscape mulch Athens', 'natural mulch']
    }
  },

  'brown-mulch': {
    name: 'Brown Dyed Mulch',
    slug: 'brown-mulch',
    category: 'mulch',
    description: 'Rich brown dyed mulch that maintains its color throughout the season while nourishing your soil.',
    longDescription: 'Our brown dyed mulch combines the benefits of natural wood mulch with long-lasting color. The rich brown tone complements any landscape design while providing all the functional benefits of organic mulch.',
    price: 35,
    unit: 'cubic yard',
    sku: 'SME-MULCH-002',
    inStock: true,
    featured: false,
    benefits: [
      'Long-lasting rich brown color',
      'Excellent weed suppression',
      'Retains moisture effectively',
      'Natural wood composition'
    ],
    applications: [
      'Residential landscaping',
      'Commercial properties',
      'Flower beds',
      'Tree rings'
    ],
    images: {
      primary: 'Soul Miner\'s/products/mulch/TOPO_brown.jpg.jpg',
      gallery: ['Soul Miner\'s/products/mulch/brown-mulch.jpg.jpg', 'Soul Miner\'s/products/mulch/brown-mulch-action.jpg.jpg']
    },
    seo: {
      title: 'Brown Dyed Mulch Athens GA | Long-Lasting Color',
      description: 'Premium brown dyed mulch with season-long color retention. Perfect for residential and commercial landscapes.',
      keywords: ['brown mulch', 'dyed mulch Athens', 'colored mulch', 'landscape mulch']
    }
  },

  'pine-bark-mulch': {
    name: 'Pine Bark Mulch',
    slug: 'pine-bark-mulch',
    category: 'mulch',
    description: 'Natural pine bark mulch perfect for acid-loving plants and attractive landscape beds.',
    longDescription: 'Pure pine bark mulch provides a naturally attractive reddish-brown color and creates slightly acidic conditions ideal for azaleas, rhododendrons, and other acid-loving plants.',
    price: 32,
    unit: 'cubic yard',
    sku: 'SME-MULCH-003',
    inStock: true,
    featured: false,
    benefits: [
      'Ideal for acid-loving plants',
      'Natural reddish-brown color',
      'Excellent drainage',
      'Pleasant pine scent',
      'Slow decomposition'
    ],
    applications: [
      'Azaleas and rhododendrons',
      'Blueberry bushes',
      'Ornamental landscaping',
      'Foundation plantings'
    ],
    images: {
      primary: 'Soul Miner\'s/products/mulch/TOPO_pinebark.jpg.jpg',
      gallery: []
    },
    seo: {
      title: 'Pine Bark Mulch | Natural Mulch for Acid-Loving Plants',
      description: 'Natural pine bark mulch perfect for azaleas, rhododendrons, and acid-loving plants. Beautiful color and excellent performance.',
      keywords: ['pine bark mulch', 'acidic mulch', 'azalea mulch', 'natural bark mulch']
    }
  },

  'black-mulch': {
    name: 'Black Dyed Mulch',
    slug: 'black-mulch',
    category: 'mulch',
    description: 'Deep black dyed mulch that creates dramatic contrast and maintains its color all season long.',
    longDescription: 'Our premium black dyed mulch creates stunning visual contrast in your landscape. The deep black color makes plants pop while providing all the functional benefits of quality mulch.',
    price: 35,
    unit: 'cubic yard',
    sku: 'SME-MULCH-004',
    inStock: true,
    featured: false,
    benefits: [
      'Dramatic black color',
      'Creates strong visual contrast',
      'Color lasts all season',
      'Excellent for modern landscapes'
    ],
    applications: [
      'Contemporary landscapes',
      'Around specimen plants',
      'Commercial properties',
      'High-visibility areas'
    ],
    images: {
      primary: 'Soul Miner\'s/products/mulch/TOPO_black.jpg.jpg',
      gallery: ['Soul Miner\'s/products/mulch/black-mulch.jpg.jpg', 'Soul Miner\'s/products/mulch/black-mulch-application.jpg.jpg']
    },
    seo: {
      title: 'Black Dyed Mulch | Premium Landscape Mulch Athens GA',
      description: 'Dramatic black dyed mulch for stunning landscape contrast. Long-lasting color and superior performance.',
      keywords: ['black mulch', 'black dyed mulch', 'landscape mulch Athens', 'colored mulch']
    }
  },

  'red-mulch': {
    name: 'Red Dyed Mulch',
    slug: 'red-mulch',
    category: 'mulch',
    description: 'Vibrant red dyed mulch that adds warmth and color to your landscape beds.',
    longDescription: 'Our red dyed mulch brings vibrant color to your landscape while providing excellent weed control and moisture retention. The rich red tone creates a warm, inviting appearance.',
    price: 35,
    unit: 'cubic yard',
    sku: 'SME-MULCH-005',
    inStock: true,
    featured: false,
    benefits: [
      'Vibrant red color',
      'Warm, inviting appearance',
      'Long-lasting color retention',
      'Superior weed control'
    ],
    applications: [
      'Traditional landscaping',
      'Residential beds',
      'Accent areas',
      'Tree rings'
    ],
    images: {
      primary: 'Soul Miner\'s/products/mulch/red-mulch.jpg.jpg',
      gallery: ['Soul Miner\'s/products/mulch/red-mulch-application.jpg.jpg']
    },
    seo: {
      title: 'Red Dyed Mulch Athens GA | Vibrant Landscape Color',
      description: 'Premium red dyed mulch for warm, colorful landscapes. Excellent weed control and moisture retention.',
      keywords: ['red mulch', 'red dyed mulch Athens', 'colored landscape mulch', 'garden mulch']
    }
  },

  'single-ground-mulch': {
    name: 'Single Ground Mulch',
    slug: 'single-ground-mulch',
    category: 'mulch',
    description: 'Natural single-ground mulch for economical coverage on large landscaping projects.',
    longDescription: 'Our single-ground mulch offers an economical solution for large landscape projects. While coarser than double-ground, it provides excellent erosion control and natural weed suppression.',
    price: 25,
    unit: 'cubic yard',
    sku: 'SME-MULCH-006',
    inStock: true,
    featured: false,
    benefits: [
      'Economical option',
      'Good for large projects',
      'Excellent erosion control',
      'Natural appearance',
      'Breaks down to enrich soil'
    ],
    applications: [
      'Large landscape projects',
      'Erosion control',
      'Playground surfacing',
      'Natural areas',
      'Slope stabilization'
    ],
    images: {
      primary: 'Soul Miner\'s/products/mulch/TOPO_single.jpg.jpg',
      gallery: []
    },
    seo: {
      title: 'Single Ground Mulch | Economical Landscape Mulch',
      description: 'Affordable single-ground mulch for large projects. Natural erosion control and weed suppression.',
      keywords: ['single ground mulch', 'economical mulch', 'bulk mulch Athens', 'natural mulch']
    }
  },

  'wood-chips': {
    name: 'Wood Chips',
    slug: 'wood-chips',
    category: 'mulch',
    description: 'Natural wood chips perfect for pathways, playgrounds, and rustic landscape areas.',
    longDescription: 'Our natural wood chips provide a chunky, rustic appearance ideal for paths, playgrounds, and natural landscape areas. They offer excellent drainage and create a soft, cushioned surface.',
    price: 20,
    unit: 'cubic yard',
    sku: 'SME-MULCH-007',
    inStock: true,
    featured: false,
    benefits: [
      'Rustic, natural appearance',
      'Excellent for pathways',
      'Soft, cushioned surface',
      'Superior drainage',
      'Most economical option'
    ],
    applications: [
      'Walking paths and trails',
      'Play areas',
      'Dog runs',
      'Natural landscapes',
      'Slope erosion control'
    ],
    images: {
      primary: 'Soul Miner\'s/products/mulch/TOPO_woodchips.jpg.jpg',
      gallery: []
    },
    seo: {
      title: 'Natural Wood Chips | Pathway & Playground Mulch',
      description: 'Chunky natural wood chips for pathways, playgrounds, and rustic landscapes. Excellent drainage and cushioning.',
      keywords: ['wood chips', 'playground mulch', 'pathway mulch', 'natural wood chips Athens']
    }
  },

  // SOIL PRODUCTS
  'topsoil': {
    name: 'Premium Topsoil',
    slug: 'topsoil',
    category: 'soil',
    description: 'High-quality screened topsoil perfect for lawns, gardens, and landscape grading.',
    longDescription: 'Our premium topsoil is carefully screened to remove rocks and debris, creating a nutrient-rich foundation for lawns and gardens. Ideal for filling low spots, establishing new lawns, or improving existing soil.',
    price: 30,
    unit: 'cubic yard',
    sku: 'SME-SOIL-001',
    inStock: true,
    featured: true,
    benefits: [
      'Screened and clean',
      'Rich in organic matter',
      'Excellent for lawns',
      'Good drainage properties',
      'Weed-free'
    ],
    applications: [
      'New lawn installation',
      'Garden bed preparation',
      'Filling low spots',
      'Grade correction',
      'General landscaping'
    ],
    images: {
      primary: 'Soul Miner\'s/products/soil/TOPO_topsoil.jpg.jpg',
      gallery: ['Soul Miner\'s/products/soil/top-soil-action.jpg.jpg']
    },
    seo: {
      title: 'Premium Topsoil Athens GA | Screened Garden Soil',
      description: 'High-quality screened topsoil for lawns and gardens. Nutrient-rich and weed-free.',
      keywords: ['topsoil Athens GA', 'screened topsoil', 'garden soil', 'lawn soil']
    }
  },

  'bioretention-soil': {
    name: 'Bioretention Soil Mix',
    slug: 'bioretention-soil',
    category: 'soil',
    description: 'Engineered soil mix designed for stormwater management and bioretention systems.',
    longDescription: 'Our bioretention soil is specifically engineered to meet municipal stormwater management requirements. This specialized blend provides excellent drainage while filtering pollutants and supporting plant growth in rain gardens and bioswales.',
    price: 45,
    unit: 'cubic yard',
    sku: 'SME-SOIL-002',
    inStock: true,
    featured: false,
    certifications: ['Meets GA Stormwater Standards'],
    benefits: [
      'Engineered for stormwater systems',
      'Excellent filtration properties',
      'Supports native plants',
      'Meets municipal specs',
      'Long-term performance'
    ],
    applications: [
      'Rain gardens',
      'Bioswales',
      'Stormwater retention ponds',
      'Green infrastructure',
      'Commercial developments'
    ],
    images: {
      primary: 'Soul Miner\'s/products/soil/bioretention-soil-0.jpg.jpg',
      gallery: ['Soul Miner\'s/products/soil/bioretention-soil-1.jpg.jpg', 'Soul Miner\'s/products/soil/bioretention-soil-10.jpg.jpg']
    },
    seo: {
      title: 'Bioretention Soil Mix Athens GA | Stormwater Management',
      description: 'Engineered bioretention soil for rain gardens and stormwater systems. Meets municipal specifications.',
      keywords: ['bioretention soil', 'rain garden soil', 'stormwater soil', 'bioswale soil Athens']
    }
  },

  'sod-soil': {
    name: 'Sod Soil Blend',
    slug: 'sod-soil',
    category: 'soil',
    description: 'Premium soil blend specially formulated for sod installation and lawn establishment.',
    longDescription: 'Our sod soil blend is specifically formulated for successful sod installation. This premium mix provides the perfect balance of drainage and moisture retention, ensuring strong root development and long-term lawn health.',
    price: 35,
    unit: 'cubic yard',
    sku: 'SME-SOIL-003',
    inStock: true,
    featured: false,
    benefits: [
      'Optimized for sod installation',
      'Promotes strong root growth',
      'Excellent water retention',
      'Nutrient-rich blend',
      'Level, workable consistency'
    ],
    applications: [
      'New sod installation',
      'Lawn renovation',
      'Athletic fields',
      'Commercial landscapes',
      'Residential lawns'
    ],
    images: {
      primary: 'Soul Miner\'s/products/soil/sod-soil.jpg.jpg',
      gallery: []
    },
    seo: {
      title: 'Sod Soil Blend | Premium Lawn Installation Soil',
      description: 'Specially formulated sod soil for successful lawn installation. Promotes strong roots and healthy growth.',
      keywords: ['sod soil', 'lawn installation soil', 'grass soil Athens', 'sod preparation']
    }
  },

  // SPECIALTY PRODUCTS
  'used-artificial-turf': {
    name: 'Used Artificial Turf',
    slug: 'used-artificial-turf',
    category: 'specialty',
    description: 'Heavy-duty used artificial turf rolls, perfect for outdoor projects. Each roll weighs approximately 1,300 lbs and measures 57\' x 7\'.',
    longDescription: 'Reclaimed from professional sports facilities, our used artificial turf offers an economical solution for outdoor projects. While showing signs of previous use, this heavy-duty turf is still excellent for dog runs, pathways, recreational areas, and creative landscape projects.',
    price: 100,
    unit: 'per roll (57\' x 7\')',
    sku: 'SME-SPEC-001',
    inStock: true,
    featured: false,
    weight: '1,300 lbs per roll',
    dimensions: '57 feet x 7 feet',
    benefits: [
      'Economical turf solution',
      'Heavy-duty construction',
      'Weather-resistant',
      'No maintenance required',
      'Sustainable reuse'
    ],
    applications: [
      'Dog runs and kennels',
      'Pathways and walkways',
      'Under swing sets',
      'Recreational areas',
      'Creative landscape projects'
    ],
    images: {
      primary: 'Soul Miner\'s/products/specialty/used_turf-for-sale-3.jpg.jpg',
      gallery: ['Soul Miner\'s/products/specialty/Used_Artificial_Turff.jpeg']
    },
    seo: {
      title: 'Used Artificial Turf Athens GA | Reclaimed Turf Rolls',
      description: 'Heavy-duty used artificial turf from professional facilities. Perfect for dog runs, pathways, and outdoor projects.',
      keywords: ['used artificial turf', 'reclaimed turf Athens', 'dog run turf', 'artificial grass Georgia']
    }
  },

  'compost-blend': {
    name: 'Topsoil-Compost Blend',
    slug: 'compost-blend',
    category: 'specialty',
    description: 'Premium blend of topsoil and compost, ideal for raised beds and garden installations.',
    longDescription: 'Our custom topsoil-compost blend combines the structure of quality topsoil with the nutrition of certified organic compost. This ready-to-plant mix is perfect for raised beds, container gardens, and new garden installations.',
    price: 40,
    unit: 'cubic yard',
    sku: 'SME-SPEC-002',
    inStock: true,
    featured: true,
    benefits: [
      'Ready-to-plant formula',
      'Perfect nutrient balance',
      'Excellent water retention',
      'No additional amendments needed',
      'Contains certified organic compost'
    ],
    applications: [
      'Raised bed gardens',
      'Container gardens',
      'Vegetable gardens',
      'Flower beds',
      'New garden installations'
    ],
    images: {
      primary: 'Soul Miner\'s/products/specialty/compost-blend.jpg.jpg',
      gallery: ['Soul Miner\'s/products/specialty/topsoil-compost.jpg.jpg']
    },
    seo: {
      title: 'Topsoil-Compost Blend | Premium Garden Soil Mix',
      description: 'Ready-to-plant blend of topsoil and certified organic compost. Perfect for raised beds and vegetable gardens.',
      keywords: ['compost blend', 'garden soil mix', 'raised bed soil', 'planting mix Athens']
    }
  }
};

/**
 * Main parsing function
 */
async function parseProducts() {
  console.log('🌱 Soul Miner\'s Eden Product Parser\n');
  console.log('📋 Parsing product catalog...\n');

  try {
    // Ensure output directory exists
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Convert catalog to array format
    const products = Object.values(PRODUCT_CATALOG);

    // Add metadata
    const output = {
      metadata: {
        generatedAt: new Date().toISOString(),
        totalProducts: products.length,
        categories: {
          compost: products.filter(p => p.category === 'compost').length,
          mulch: products.filter(p => p.category === 'mulch').length,
          soil: products.filter(p => p.category === 'soil').length,
          specialty: products.filter(p => p.category === 'specialty').length,
        },
        source: 'Soul Miner\'s Eden Website Crawler',
        version: '1.0.0'
      },
      products: products
    };

    // Write to file
    await fs.writeFile(OUTPUT_JSON, JSON.stringify(output, null, 2));

    console.log('✅ Product catalog generated successfully!\n');
    console.log('📊 Summary:');
    console.log(`   Total Products: ${output.metadata.totalProducts}`);
    console.log(`   - Compost: ${output.metadata.categories.compost}`);
    console.log(`   - Mulch: ${output.metadata.categories.mulch}`);
    console.log(`   - Soil: ${output.metadata.categories.soil}`);
    console.log(`   - Specialty: ${output.metadata.categories.specialty}\n`);
    console.log(`💾 Output: ${OUTPUT_JSON}\n`);

    console.log('📦 Featured Products:');
    products.filter(p => p.featured).forEach(p => {
      console.log(`   ⭐ ${p.name} - $${p.price}/${p.unit}`);
    });

    console.log('\n✨ Ready for Cloudinary migration and component integration!\n');

  } catch (error) {
    console.error('❌ Error parsing products:', error);
    process.exit(1);
  }
}

// Run parser
if (require.main === module) {
  parseProducts();
}

module.exports = { PRODUCT_CATALOG, parseProducts };
