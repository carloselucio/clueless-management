module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inset': 'inset 6px 6px 15px -2px rgb(0 0 0 / 0.3)',
      },
      colors: {
        'clueless-blue': '#335BB8',
      }      
    },
  },
  variants:{
    extends:{},
  },
  plugins: [],
};