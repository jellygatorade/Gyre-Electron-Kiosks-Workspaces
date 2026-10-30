module.exports = {
  content: ["./src/*.{html,js}", "./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      CaseLight: ["Case-Light"],
      CaseMedium: ["Case-Medium"],
      CaseTextLight: ["CaseText-Light"],
      CaseTextRegular: ["CaseText-Regular"],
      CaseTextMedium: ["CaseText-Medium"],
      CaseMicroRegular: ["CaseMicro-Regular"],
    },
    colors: {
      white: "#ffffff",
      black: "#000000",
      transparent: "rgba(0, 0, 0, 0)",
      neutral: {
        50: "#FAFAFA",
        100: "#F5F5F5",
        200: "#E5E5E5",
        300: "#D4D4D4",
        400: "#A3A3A3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
      },
      orange: {
        ncma: "#D34322" /* Vermillion from 2026 NCMA palette */,
      },
    },
    extend: {},
    plugins: [],
  },
};
