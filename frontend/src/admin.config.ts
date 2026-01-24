/**
 * Soul Miner's Eden Admin Configuration
 *
 * Based on @pointdog/admin-core patterns
 */

export interface AdminConfig {
  siteName: string;
  siteSlug: string;
  brandId: string;
  siteUrl: string;
  modules: AdminModules;
  colors: BrandColors;
  typography: TypographyConfig;
}

export interface AdminModules {
  dashboard: boolean;
  siteReview: boolean;
  contentQueue: boolean;
  voiceSystem: boolean;
  seoAudit: boolean;
  brandGuide: boolean;
}

export interface BrandColors {
  primary: string;
  primaryHover: string;
  accent: string;
  dark: string;
  light: string;
  primaryText: string;
}

export interface TypographyConfig {
  headingFont: string;
  bodyFont: string;
  baseSize: string;
  scaleRatio: number;
  headings: HeadingConfig[];
}

export interface HeadingConfig {
  tag: string;
  size: string;
  weight: number;
  lineHeight: number;
  clamp?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  module?: keyof AdminModules;
}

/**
 * Soul Miner's Eden admin config
 */
export const adminConfig: AdminConfig = {
  siteName: "Soul Miner's Eden",
  siteSlug: 'soul-miners-eden',
  brandId: 'sme-local', // TODO: Replace with Supabase brand ID when integrated
  siteUrl: 'https://soulminerseden.com',
  modules: {
    dashboard: true,
    siteReview: true,     // AI detection via Mothership Supabase
    contentQueue: false,  // Not needed yet
    voiceSystem: false,   // Not needed yet
    seoAudit: false,      // Not needed yet
    brandGuide: true,     // Useful for reference
  },
  colors: {
    primary: '#b59289',     // SME terracotta
    primaryHover: '#a17e75', // Darker terracotta
    accent: '#22c55e',      // Green CTA
    dark: '#43352d',        // Dark earth
    light: '#f9f5f4',       // Light terracotta tint
    primaryText: '#ffffff',
  },
  typography: {
    headingFont: "'Poppins', system-ui, sans-serif",
    bodyFont: "'Inter', system-ui, sans-serif",
    baseSize: '16px',
    scaleRatio: 1.333,
    headings: [
      { tag: 'H1', size: '2.441rem', weight: 700, lineHeight: 1.1, clamp: 'clamp(2rem, 5vw, 3rem)' },
      { tag: 'H2', size: '1.953rem', weight: 700, lineHeight: 1.2, clamp: 'clamp(1.75rem, 4vw, 2.25rem)' },
      { tag: 'H3', size: '1.563rem', weight: 600, lineHeight: 1.25, clamp: 'clamp(1.25rem, 3vw, 1.75rem)' },
      { tag: 'H4', size: '1.25rem', weight: 600, lineHeight: 1.3 },
      { tag: 'H5', size: '1rem', weight: 600, lineHeight: 1.4 },
      { tag: 'H6', size: '0.875rem', weight: 600, lineHeight: 1.4 },
    ],
  },
};

/**
 * Navigation items - filtered by enabled modules
 */
export const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: 'home', module: 'dashboard' },
  { label: 'Site Review', href: '/admin/review', icon: 'check-square', module: 'siteReview' },
  { label: 'Content Queue', href: '/admin/content', icon: 'layers', module: 'contentQueue' },
  { label: 'Voice System', href: '/admin/voice', icon: 'mic', module: 'voiceSystem' },
  { label: 'SEO Audit', href: '/admin/seo', icon: 'search', module: 'seoAudit' },
  { label: 'Brand Guide', href: '/admin/brand', icon: 'palette', module: 'brandGuide' },
];

/**
 * Admin icon library (SVG paths)
 */
export const ADMIN_ICONS: Record<string, string> = {
  home: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
  'check-square': '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>',
  layers: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>',
  mic: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>',
  search: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
  palette: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"></path></svg>',
  'arrow-left': '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
  menu: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>',
  file: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>',
};
