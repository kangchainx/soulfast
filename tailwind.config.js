/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Configure the content for all of your existing files
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        soul: {
          bg: "#FFF9F2", // 暖白色
          accent: "#FF8C69", // 强调色橙色
          text: "#4A4238", // 深棕色字体
          muted: "#D4A373", // 辅助色/金棕色
        },
      },
      fontFamily: {
        // 配置字体映射，添加 Web 平台的后备字体
        sans: ["NotoSansSC-Regular", "system-ui", "-apple-system", "sans-serif"],
        "sans-medium": ["NotoSansSC-Medium", "system-ui", "-apple-system", "sans-serif"],
        "sans-bold": ["NotoSansSC-Bold", "system-ui", "-apple-system", "sans-serif"],
        cinzel: ["Cinzel-Regular", "serif"],
      },
    },
  },
  plugins: [],
};
