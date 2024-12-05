/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
    colors:{
      'brandcolor': '#B0D8DA'  
    }
    },
    container:{
      center:true,
     padding:'300px' 
    },
    fontFamily:{
      'poppins':["Poppins", 'sans-serif']
    }
  },
  plugins: [],
}
