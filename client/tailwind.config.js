/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    gridTemplateColumns: {
      'fill-25': 'repeat(auto-fit, 350px)',
    },
    extend: {
      fontFamily: {
        workSans: ['Work Sans', 'sans-serif'],
      },
    },
    colors: {
      black: '#000000',
      blue: '#10225a',
      purple: '#7e5bef',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      yellow: '#ffc82c',
      'gray-dark': '#273444',
      gray: '#858584',
      'gray-light': '#d3dce6',
      white: '#ffffff',
      'blue-light': '#1f3c88',
      'blue-footer': '#5893d4',
    },
  },
  plugins: [],
};
