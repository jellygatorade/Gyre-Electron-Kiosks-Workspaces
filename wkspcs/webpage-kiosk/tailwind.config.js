/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      CaseTextLight: ["CaseText-Light"],
      CaseTextRegular: ["CaseText-Regular"],
    },
    extend: {
      colors: {
        //
        // Built with https://uicolors.app/create
        //
        ncma_orange: {
          50: "#fdf5ef",
          100: "#fae7da",
          200: "#f5ccb3",
          300: "#eeaa83",
          // 400: "#e67d51",
          400: "#e0592a", // ncma orange - primary accent
          500: "#e0592a", // ncma orange - primary accent
          600: "#d24624",
          700: "#ae3320",
          800: "#8b2b21",
          900: "#71261d",
          950: "#3d110d",
        },
        ncma_yellow: {
          50: "#fefce8",
          100: "#fffac2",
          200: "#fff387",
          300: "#ffe443",
          400: "#ffce02", // ncma yellow - secondary accent
          500: "#efb803",
          600: "#ce8d00",
          700: "#a46404",
          800: "#884e0b",
          900: "#734010",
          950: "#432005",
        },
        ncma_light_green: {
          50: "#fcfbe9",
          100: "#f7f5d0",
          200: "#f0eea6",
          300: "#e5e471",
          400: "#d5d546",
          500: "#aaac24", // ncma light green
          600: "#91951b",
          700: "#6e7219",
          800: "#565a1a",
          900: "#494d1a",
          950: "#272a09",
        },
        ncma_dark_green: {
          50: "#f1fcf4",
          100: "#defae8",
          200: "#bff3d1",
          300: "#8de8ae",
          400: "#53d582",
          500: "#2cbb61",
          600: "#1f9a4c", // ncma dark green
          700: "#1c793f",
          800: "#1b6035",
          900: "#1a5632",
          950: "#082b16",
        },
        ncma_blue: {
          50: "#ebfeff",
          100: "#cdf9ff",
          200: "#a1f1ff",
          300: "#60e5ff",
          400: "#18cef8",
          500: "#00b1de",
          600: "#008fbe", // ncma blue
          700: "#086f96",
          800: "#105a7a",
          900: "#124b67",
          950: "#053047",
        },
        ncma_dark_blue: {
          50: "#eff6ff",
          100: "#deedff",
          200: "#b6dbff",
          300: "#76bfff",
          400: "#2d9fff",
          500: "#0283f5",
          600: "#0065d2",
          700: "#0051aa",
          800: "#004a97", // ncma dark blue
          900: "#073a73",
          950: "#04244d",
        },
        ncma_purple: {
          50: "#f9f5ff",
          100: "#f2e9fe",
          200: "#e7d7fd",
          300: "#d4b7fb",
          400: "#b989f7",
          500: "#9e5cf0",
          600: "#883be2",
          700: "#732ac6",
          800: "#60269e", // ncma purple
          900: "#512182",
          950: "#350b60",
        },
        ncma_violet: {
          50: "#fcf5fe",
          100: "#f7e9fe",
          200: "#f0d3fb",
          300: "#e8b0f7",
          400: "#da81f1",
          500: "#c750e5",
          600: "#ad30c9",
          700: "#9e28b5", // ncma violet
          800: "#782088",
          900: "#651f70",
          950: "#41084a",
        },
        ncma_rust: {
          50: "#fef8ee",
          100: "#fdefd7",
          200: "#f9daaf",
          300: "#f5c07c",
          400: "#f09b47",
          500: "#ec7e23",
          600: "#dd6519",
          700: "#b74d17",
          800: "#8c3b19", // ncma rust
          900: "#763418",
          950: "#3f180b",
        },
        ncma_red_orange: {
          50: "#fef4f2",
          100: "#fee7e2",
          200: "#fed3ca",
          300: "#fcb4a5",
          400: "#f88871",
          500: "#ef6144",
          600: "#d64123", // ncma red orange
          700: "#b9361c",
          800: "#99301b",
          900: "#7f2d1d",
          950: "#45140a",
        },
      },
    },
  },
  plugins: [],
};
