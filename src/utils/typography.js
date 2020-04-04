import Typography from "typography"

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.45,
  headerFontFamily: ["Roboto", "sans-serif"],
  bodyFontFamily: ["Roboto", "sans-serif"],
  googleFonts: [
    {
      name: "Roboto",
      styles: ["300", "400", "500", "600", "700"],
    },
  ],
})

typography.injectStyles()

export default typography
