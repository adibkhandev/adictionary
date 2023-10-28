/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily:{
        bangla:["Bangla",'sans'],
        bitterBlack:["Bitter-Black",'sans'],
        bitterBold:["Bitter-Bold",'sans'],
        bitterMedium:["Bitter-Medium",'sans'],
        bitterLight:["Bitter-Light",'sans'],
        bitterThin:["Bitter-Thin",'sans'],
      },
      spacing:{
        almost:'90vh',
      },
      screens:{
        xs:'400px',
      }
      
    },
  },
  plugins: [],
}
