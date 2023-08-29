/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./containers/**/*.{js,ts,jsx,tsx,mdx}", 
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        modal_container: "#363636",
        modal_copyright: "#979797",
        modal_header: "#ffffff",
        btn_color: "#8687E7",
        dark_btn_color: "#1D1D1D",
        ligth_text: "#AFAFAF",
        delete_color: "#FF4949",
      },
      colors: {
        modal_container: "#363636",
        modal_copyright: "#979797",
        modal_header: "#ffffff",
        btn_color: "#8687E7",
        dark_btn_color: "#1D1D1D",
        ligth_text: "#AFAFAF",
        delete_color: "#FF4949",
      },
    },
  },
  plugins: [],
};
