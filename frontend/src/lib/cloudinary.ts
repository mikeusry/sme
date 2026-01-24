/**
 * Cloudinary Utility Functions
 * Handles image transformations and URL generation for Soul Miner's Eden
 *
 * Cloud: southland-organics
 * Folder: Soul Miner's
 */

// Cloudinary configuration
const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME || 'southland-organics';
const cloudFolder = import.meta.env.PUBLIC_CLOUDINARY_FOLDER || "Soul Miner's";

if (!import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME) {
  console.warn('Cloudinary cloud name not configured in environment variables.');
}

/**
 * Cloudinary Transformation Options
 */
export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'scale' | 'pad' | 'crop' | 'thumb';
  gravity?: 'auto' | 'center' | 'face' | 'faces';
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  dpr?: 'auto' | number;
  effect?: string;
  blur?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
}

/**
 * Build Cloudinary URL with transformations
 * @param publicId - Image path within Cloudinary (e.g., 'products/compost-pile.jpg')
 * @param options - Transformation options
 * @returns Optimized Cloudinary URL
 */
export function buildCloudinaryUrl(
  publicId: string,
  options: CloudinaryTransformOptions = {}
): string {
  const {
    width,
    height,
    crop = 'fill',
    gravity = 'auto',
    quality = 'auto',
    format = 'auto',
    dpr = 'auto',
    effect,
    blur,
    brightness,
    contrast,
    saturation,
  } = options;

  // Build transformation string
  const transformations: string[] = [];

  // Crop and resize
  if (width || height) {
    const dimensions = [
      crop && `c_${crop}`,
      width && `w_${width}`,
      height && `h_${height}`,
      gravity && `g_${gravity}`,
    ]
      .filter(Boolean)
      .join(',');
    if (dimensions) transformations.push(dimensions);
  }

  // Quality and format
  const delivery = [
    quality && `q_${quality}`,
    format && `f_${format}`,
    dpr && `dpr_${dpr}`,
  ]
    .filter(Boolean)
    .join(',');
  if (delivery) transformations.push(delivery);

  // Effects
  if (effect) transformations.push(`e_${effect}`);
  if (blur !== undefined) transformations.push(`e_blur:${blur}`);
  if (brightness !== undefined) transformations.push(`e_brightness:${brightness}`);
  if (contrast !== undefined) transformations.push(`e_contrast:${contrast}`);
  if (saturation !== undefined) transformations.push(`e_saturation:${saturation}`);

  // Construct full URL
  const transformString = transformations.join('/');
  const fullPublicId = publicId.startsWith(cloudFolder)
    ? publicId
    : `${cloudFolder}/${publicId}`;

  // Encode the public ID to handle spaces and special characters
  const encodedPublicId = fullPublicId.split('/').map(segment => encodeURIComponent(segment)).join('/');

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${encodedPublicId}`;
}

/**
 * Generate responsive srcset for different screen sizes
 * @param publicId - Image path within Cloudinary
 * @param baseWidth - Base width for the image
 * @param aspectRatio - Height/width ratio (e.g., 1 for square, 0.75 for 4:3)
 * @returns srcset string with multiple sizes
 */
export function getCloudinaryResponsiveSet(
  publicId: string,
  baseWidth: number = 800,
  aspectRatio: number = 1
): { srcset: string; sizes: string } {
  const breakpoints = [400, 800, 1200, 1600, 2400];
  const relevantSizes = breakpoints.filter((size) => size <= baseWidth * 2);

  const srcset = relevantSizes
    .map((width) => {
      const height = Math.round(width * aspectRatio);
      const url = buildCloudinaryUrl(publicId, {
        width,
        height,
        crop: 'fill',
        gravity: 'auto',
        quality: 'auto',
        format: 'auto',
        dpr: 'auto',
      });
      return `${url} ${width}w`;
    })
    .join(', ');

  // Generate sizes attribute for responsive images
  const sizes = `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${baseWidth}px`;

  return { srcset, sizes };
}

/**
 * Image transformation presets for Soul Miner's Eden
 */
export const imagePresets = {
  // Product images
  productHero: (publicId: string) =>
    buildCloudinaryUrl(publicId, {
      width: 800,
      height: 800,
      crop: 'fill',
      gravity: 'auto',
      quality: 'auto',
      format: 'auto',
    }),

  productThumbnail: (publicId: string) =>
    buildCloudinaryUrl(publicId, {
      width: 300,
      height: 300,
      crop: 'fill',
      gravity: 'auto',
      quality: 'auto',
      format: 'auto',
    }),

  productGallery: (publicId: string) =>
    buildCloudinaryUrl(publicId, {
      width: 600,
      height: 600,
      crop: 'fill',
      gravity: 'auto',
      quality: 'auto',
      format: 'auto',
    }),

  // Hero/Banner images
  heroImage: (publicId: string) =>
    buildCloudinaryUrl(publicId, {
      width: 1920,
      height: 800,
      crop: 'fill',
      gravity: 'auto',
      quality: 'auto',
      format: 'auto',
    }),

  // Collection/Category images
  categoryCard: (publicId: string) =>
    buildCloudinaryUrl(publicId, {
      width: 600,
      height: 400,
      crop: 'fill',
      gravity: 'auto',
      quality: 'auto',
      format: 'auto',
    }),

  // Blog/Content images
  blogFeatured: (publicId: string) =>
    buildCloudinaryUrl(publicId, {
      width: 1200,
      height: 630,
      crop: 'fill',
      gravity: 'auto',
      quality: 'auto',
      format: 'auto',
    }),

  blogThumbnail: (publicId: string) =>
    buildCloudinaryUrl(publicId, {
      width: 400,
      height: 250,
      crop: 'fill',
      gravity: 'auto',
      quality: 'auto',
      format: 'auto',
    }),

  // Land management service images
  serviceImage: (publicId: string) =>
    buildCloudinaryUrl(publicId, {
      width: 800,
      height: 600,
      crop: 'fit',
      quality: 'auto',
      format: 'auto',
    }),

  // Team/About images
  teamMember: (publicId: string) =>
    buildCloudinaryUrl(publicId, {
      width: 400,
      height: 400,
      crop: 'fill',
      gravity: 'faces',
      quality: 'auto',
      format: 'auto',
    }),
};

/**
 * Get optimized image URL from Cloudinary public ID
 * @param publicId - Cloudinary public ID (e.g., 'products/compost-pile.jpg')
 * @param preset - Image transformation preset
 * @returns Optimized image URL
 */
export function getOptimizedImage(
  publicId: string,
  preset: keyof typeof imagePresets = 'productHero'
): string {
  return imagePresets[preset](publicId);
}

/**
 * Fallback placeholder for missing images
 */
export function getPlaceholder(width = 800, height = 800, text = 'Image'): string {
  return `https://placehold.co/${width}x${height}/b59289/ffffff?text=${encodeURIComponent(text)}`;
}
