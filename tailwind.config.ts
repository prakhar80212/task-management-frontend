import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        orange: {
          50: '#fdf3ef',
          400: '#ff6b3d',
          500: '#e85a2c',
          600: '#d14d1f',
        },
      },
    },
  },
  plugins: [],
}

export default config