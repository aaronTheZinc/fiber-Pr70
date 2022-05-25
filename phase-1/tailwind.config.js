module.exports = {
  mode: "jit",
  content: [
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/pages/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#FF7A00",
        vreel_red: "#FF3D00",
        vreel_green: "#11B03E",
        vreel_gray: "#CBD5E0",
        vreel_blue: "#1877F2",
        vreel_blue_dark: "#242A41",
        vreel_gray_dark: "#2D3450",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
};
