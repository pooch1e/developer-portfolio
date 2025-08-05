import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  darkMode: 'class', 

  theme: {
    extend: {
      fontFamily: {
        sixtyfour: ['Sixtyfour', 'sans-serif'],
      },
    },
  },

  plugins: [],
};

export default config;
