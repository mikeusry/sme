#!/usr/bin/env node

/**
 * Extract Crawl Data
 *
 * Parses the website crawl JSON and extracts structured content
 * for the Soul Miner's Eden rebuild.
 */

const fs = require('fs').promises;
const path = require('path');

const INPUT_FILE = '/Users/mikeusry/Desktop/SME 2026/dataset_website-content-crawler_2025-10-26_13-41-49-440.json';
const OUTPUT_DIR = path.join(__dirname, '../content');

async function extractCrawl() {
  console.log('Reading crawl data...');
  const raw = await fs.readFile(INPUT_FILE, 'utf8');
  const pages = JSON.parse(raw);

  console.log(`Found ${pages.length} pages\n`);

  // Categorize pages
  const categorized = {
    home: [],
    products: [],
    blog: [],
    recipes: [],
    about: [],
    contact: [],
    other: []
  };

  for (const page of pages) {
    const url = page.url;

    if (url === 'https://www.soulminerseden.com/') {
      categorized.home.push(page);
    } else if (url.includes('/landscapes/') || url.includes('/landscapes')) {
      categorized.products.push(page);
    } else if (url.includes('/blog/') || url.includes('/blog')) {
      categorized.blog.push(page);
    } else if (url.includes('/recipes/') || url.includes('/recipes') || url.includes('/collection/')) {
      categorized.recipes.push(page);
    } else if (url.includes('/about')) {
      categorized.about.push(page);
    } else if (url.includes('/contact')) {
      categorized.contact.push(page);
    } else {
      categorized.other.push(page);
    }
  }

  console.log('Page breakdown:');
  console.log(`  Home: ${categorized.home.length}`);
  console.log(`  Products: ${categorized.products.length}`);
  console.log(`  Blog: ${categorized.blog.length}`);
  console.log(`  Recipes: ${categorized.recipes.length}`);
  console.log(`  About: ${categorized.about.length}`);
  console.log(`  Contact: ${categorized.contact.length}`);
  console.log(`  Other: ${categorized.other.length}`);
  console.log('');

  // Extract homepage data
  if (categorized.home.length > 0) {
    const home = categorized.home[0];
    const homeData = {
      url: home.url,
      title: home.metadata?.title,
      description: home.metadata?.description,
      jsonLd: home.metadata?.jsonLd,
      content: home.text?.substring(0, 5000) // First 5000 chars
    };
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'pages/home.json'),
      JSON.stringify(homeData, null, 2)
    );
    console.log('Extracted: home.json');
  }

  // Extract about page
  if (categorized.about.length > 0) {
    const about = categorized.about[0];
    const aboutData = {
      url: about.url,
      title: about.metadata?.title,
      description: about.metadata?.description,
      content: about.text
    };
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'pages/about.json'),
      JSON.stringify(aboutData, null, 2)
    );
    console.log('Extracted: about.json');
  }

  // Extract contact page
  if (categorized.contact.length > 0) {
    const contact = categorized.contact[0];
    const contactData = {
      url: contact.url,
      title: contact.metadata?.title,
      description: contact.metadata?.description,
      content: contact.text
    };
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'pages/contact.json'),
      JSON.stringify(contactData, null, 2)
    );
    console.log('Extracted: contact.json');
  }

  // Extract product pages
  const products = [];
  for (const page of categorized.products) {
    if (page.url === 'https://www.soulminerseden.com/landscapes') {
      // This is the index page, skip individual extraction
      continue;
    }

    const slug = page.url.split('/').pop();
    const productData = {
      url: page.url,
      slug: slug,
      title: page.metadata?.title,
      description: page.metadata?.description,
      content: page.text
    };
    products.push(productData);
  }

  await fs.writeFile(
    path.join(OUTPUT_DIR, 'products/crawled-products.json'),
    JSON.stringify(products, null, 2)
  );
  console.log(`Extracted: ${products.length} products`);

  // Extract blog posts
  const blogPosts = [];
  for (const page of categorized.blog) {
    if (page.url === 'https://www.soulminerseden.com/blog') {
      continue; // Skip index
    }

    const slug = page.url.split('/').pop();
    const postData = {
      url: page.url,
      slug: slug,
      title: page.metadata?.title,
      description: page.metadata?.description,
      content: page.text
    };
    blogPosts.push(postData);
  }

  await fs.writeFile(
    path.join(OUTPUT_DIR, 'blog/crawled-posts.json'),
    JSON.stringify(blogPosts, null, 2)
  );
  console.log(`Extracted: ${blogPosts.length} blog posts`);

  // Extract business info from JSON-LD
  const home = categorized.home[0];
  if (home?.metadata?.jsonLd) {
    const jsonLd = home.metadata.jsonLd;
    const localBusiness = jsonLd.find(item => item['@type'] === 'LocalBusiness');

    if (localBusiness) {
      const businessInfo = {
        name: localBusiness.name,
        description: localBusiness.description,
        url: localBusiness.url,
        logo: localBusiness.logo,
        image: localBusiness.image,
        address: localBusiness.address,
        geo: localBusiness.geo,
        telephone: localBusiness.telephone,
        email: localBusiness.email,
        openingHours: localBusiness.openingHours,
        priceRange: localBusiness.priceRange,
        socialLinks: localBusiness.sameAs,
        rating: localBusiness.service?.aggregateRating
      };

      await fs.writeFile(
        path.join(OUTPUT_DIR, 'pages/business-info.json'),
        JSON.stringify(businessInfo, null, 2)
      );
      console.log('Extracted: business-info.json');
    }
  }

  // Create site map summary
  const siteMap = {
    extractedAt: new Date().toISOString(),
    totalPages: pages.length,
    breakdown: {
      home: categorized.home.length,
      products: products.length,
      blog: blogPosts.length,
      recipes: categorized.recipes.length,
      about: categorized.about.length,
      contact: categorized.contact.length,
      other: categorized.other.length
    },
    productSlugs: products.map(p => p.slug),
    blogSlugs: blogPosts.map(p => p.slug),
    otherUrls: categorized.other.map(p => p.url)
  };

  await fs.writeFile(
    path.join(OUTPUT_DIR, 'site-map.json'),
    JSON.stringify(siteMap, null, 2)
  );
  console.log('Extracted: site-map.json');

  console.log('\nDone!');
}

extractCrawl().catch(console.error);
