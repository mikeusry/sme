/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Soul Miner's Eden Brand Colors
        primary: {
          50: '#f9f5f4',   // Lightest terracotta tint
          100: '#f3ebe9',  // Very light terracotta
          200: '#e4d5d3',  // Pantone 7604 C - Light blush
          300: '#d4b5af',  // Medium light terracotta
          400: '#c5a49c',  // Medium terracotta
          500: '#b59289',  // Pantone 2440 C - Main brand terracotta
          600: '#a17e75',  // Deeper terracotta
          700: '#826658',  // Dark terracotta
          800: '#624d42',  // Darker earth
          900: '#43352d',  // Darkest earth
          950: '#2a211b',  // Almost black earth
        },
        secondary: {
          50: '#fafaf9',   // Almost white
          100: '#f5f5f4',  // Very light warm gray
          200: '#e9e9e7',  // Light warm gray
          300: '#d9d9d6',  // Pantone Cool Gray 1C
          400: '#c7c8c3',  // Medium light gray
          500: '#babbb1',  // Pantone 413 C - Medium gray
          600: '#9fa097',  // Medium gray
          700: '#7e7f74',  // Pantone 416 C - Sage gray
          800: '#5f5f56',  // Dark sage
          900: '#42423a',  // Darker gray
          950: '#2a2a25',  // Almost black gray
        },
        // Accent color for CTAs and highlights
        accent: {
          50: '#f0fdf4',   // Very light green
          100: '#dcfce7',  // Light green
          200: '#bbf7d0',  // Soft green
          300: '#86efac',  // Medium green
          400: '#4ade80',  // Bright green
          500: '#22c55e',  // Strong green (main CTA color)
          600: '#16a34a',  // Deep green
          700: '#15803d',  // Darker green
          800: '#166534',  // Forest green
          900: '#14532d',  // Very dark green
          950: '#052e16',  // Almost black green
        },
        // Warm neutrals for backgrounds
        warm: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
