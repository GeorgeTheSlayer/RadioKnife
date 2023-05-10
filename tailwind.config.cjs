const colors = require('tailwindcss/colors');
//Logo text-5xl
//Medium text-2xl
//Small text-base


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
      fontFamily: {
          'sans': ['Helvetica', 'Arial', 'sans-serif'],
          //helvetica: ["Helvetica", "sans-serif"],
      },
      colors: {
          transparent: 'transparent',
          current: 'currentColor',
          black: colors.black,
          white: colors.white,
          gray: colors.gray,
          emerald: colors.emerald,
          indigo: colors.indigo,
          yellow: colors.yellow,

        'mono': {
          60: '#faf9f5',
          30: '#f2efea',
          10: '#3e3e41',
        },
        'primary': {
            b: '#14181B',
            w: '#FFFFFF',
            g: '#E8E8E8',
        },
        'pastel': {
              w: '#FFFFFF',
            b: '#000000',
            g: '#4E4E4E',
            p: '#FF9E9E',
            c: '#9e9eff',
            y: '#ffff9e',
        }
  },
    extend: {},
  },

  plugins: [],
}
