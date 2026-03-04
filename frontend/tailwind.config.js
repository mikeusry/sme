/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Soul Miner's Eden — Estate Palette (locked 2026-02-22)
        // Every color points at something real on the 65 acres.
        // See frontend/src/brand/DESIGN_LOG.md for rationale.

        // Primary = Eden Clay (#A8643F) — Georgia red clay, exposed earth
        // Role: warm accent, links, highlights
        primary: {
          50: '#FBF6F2',
          100: '#F5EBE2',
          200: '#DBBFA8',   // eden-clay-light
          300: '#C9A07A',
          400: '#B8825C',
          500: '#A8643F',   // eden-clay (anchor)
          600: '#8B5233',
          700: '#6E4028',
          800: '#52301E',
          900: '#362014',
          950: '#1B100A',
        },

        // Accent = Eden Sage (#4D6B42) — pasture grass, woodland understory
        // Role: primary CTA buttons
        accent: {
          50: '#F4F7F2',
          100: '#E8EDDE',   // eden-sage-light
          200: '#C8D5B8',
          300: '#A3BA8E',
          400: '#789E65',
          500: '#5A7E4C',
          600: '#4D6B42',   // eden-sage (anchor)
          700: '#3D5535',
          800: '#2E4028',
          900: '#1F2B1B',
          950: '#10160E',
        },

        // Secondary = Eden Steel (#6E6E68) — pavilion galvanized metal
        // Role: secondary text, borders, nav
        secondary: {
          50: '#F7F7F6',
          100: '#EFEEEE',
          200: '#DEDDDB',
          300: '#C4C3C0',
          400: '#B0B0AA',   // eden-steel-light
          500: '#8E8E87',
          600: '#6E6E68',   // eden-steel (anchor)
          700: '#585853',
          800: '#42423E',
          900: '#2D2D2A',
          950: '#171715',
        },

        // Warm = Eden Cream → Charcoal scale
        // Role: backgrounds (50) through text (900)
        warm: {
          50: '#FAF8F5',    // eden-cream
          100: '#F0EDE8',   // eden-cream-dark
          200: '#E2DED8',
          300: '#C8C3BB',
          400: '#9E9890',
          500: '#787068',
          600: '#5C554E',
          700: '#454039',
          800: '#383330',
          900: '#2D2926',   // eden-charcoal
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
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
