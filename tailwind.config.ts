import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './app/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        lingi: '0 26px 58px rgba(64, 93, 91, 0.14)',
        nav: '0 18px 46px rgba(64, 93, 91, 0.15)',
      },
      fontFamily: {
        lingiDisplay: ['"Arial Rounded MT Bold"', '"Avenir Next"', '"SF Pro Rounded"', 'ui-rounded', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"PingFang SC"', 'sans-serif'],
        lingiBody: ['"Avenir Next"', '"SF Pro Rounded"', 'ui-rounded', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"PingFang SC"', '"Noto Sans CJK SC"', '"Microsoft YaHei"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
