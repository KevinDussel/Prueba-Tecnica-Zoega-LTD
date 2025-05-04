/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
      extend: { 
        fontFamily: {
          'sans': ['Inter', 'sans-serif'],
        },
        colors:{
          primary: '#00C2A8',
          background: '#F5F7FA'
        },
    },
  },
  plugins: [],
};

