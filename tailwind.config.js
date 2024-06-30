/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      backgroundBlue : "#154f5d",
      white: "#ffffff",
      whiteSmoke: "#f5f5f5",
      orange: "#f25d01",
      bgGreen: "#CCFBF1",
      txtGreen: "#0F766E",
      bgRed :"#FFD9D9",
      txtRed: "#E41300",
      bgYellow: "#FEF3C7",
      txtYellow: "#B45309",
      bgBlue: '#ceeaff',
      txtBlue: "#287DBE",
      borderColor : "rgba(162, 158, 154, 0.527)",
      secondBorderColor : "#808080",
      green: "#009C00"
    },
    boxShadow: {
      allBox: '0px 0px 7px rgba(55, 54, 54, 0.637)',
      lightBox: '0px 0px 3px rgba(55, 54, 54, 0.637)'
    },
    backgroundImage: {
      'rocket': "url('rocket back.png')",
    }
  },
  plugins: [],
}