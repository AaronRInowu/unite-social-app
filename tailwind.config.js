/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Gradientes de fondo
        "gradient-1": "rgb(21,3,52)", // bgGradient1
        "gradient-2": "rgb(24,7,64)", // bgGradient2

        // Gradientes de botones
        "btn-primary": "#E21DF3", // btnGradient1
        "btn-secondary": "#7B3BCC", // btnGradient2

        // Colores de fondo
        "bg-third": "#22244B", // bgThird
        "info-blue": "#5043EC", // infoBlue
        "blue-gray": "#22244B",
        "pale-yellow": "#FFF6A3",

        // Colores de utilidad
        "main-text": "#ffffff",
        "input-border": "#ffffff40",
        "input-bg": "#ffffff1A",
        debug: "#f00",
      },
      textColor: {
        main: "#ffffff",
        "input-border": "#ffffff40",
        "btn-primary": "#E21DF3",
        "btn-secondary": "#7B3BCC",
      },
      backgroundColor: {
        "input-bg": "#ffffff1A",
        "bg-third": "#22244B",
        "gradient-1": "rgb(21,3,52)",
        "gradient-2": "rgb(24,7,64)",
      },
      borderColor: {
        "input-border": "#ffffff40",
        "main-text": "#ffffff",
        "btn-primary": "#E21DF3",
      },
      fontFamily: {
        satoshi: ["Satoshi-Regular"],
        "satoshi-medium": ["Satoshi-Medium"],
        "satoshi-bold": ["Satoshi-Bold"],
        "satoshi-light": ["Satoshi-Light"],
        "satoshi-black": ["Satoshi-Black"],
      },
      fontSize: {
        // Tamaños de texto personalizados (manteniendo los de Tailwind también)
        "xs-custom": "16px", // textXs
        "sm-custom": "20px", // textSm
        "base-custom": "24px", // textBase
        "md-custom": "28px", // textMd
        "lg-custom": "32px", // textLg
        "xl-custom": "36px", // textXl
        "unite-title": "39px", // text2Xl
      },
      borderRadius: {
        custom: "12px", // regularBtnStyle, defaultTextInput
        "custom-xl": "24px", // topRadiusXl
      },
      spacing: {
        "input-y": "12px", // paddingVertical para inputs
        "input-x": "20px", // paddingHorizontal para inputs
        btn: "15px", // padding para botones
      },
    },
  },
  plugins: [],
};
