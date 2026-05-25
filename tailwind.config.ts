import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  darkMode: 'class', 

  theme: {
    extend: {
      fontFamily: {
        sixtyfour: ['Sixtyfour', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 700ms ease-in-out forwards',
      },
    },
  },

  plugins: [],
};

export default config;
