/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        modal_container: "#363636",
        modal_copyright: "#979797",
        modal_header: "#ffffff",
        btn_color: "#8687E7",
      },
      colors: {
        modal_container: "#363636",
        modal_copyright: "#979797",
        modal_header: "#ffffff",
        btn_color: "#8687E7",
      },
    },
  },
  plugins: [],
};
