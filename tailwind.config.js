/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto Mono, monospace',
      },
      backgroundImage: {
        home: "url('./src/assets/images/bg-image.jpg')",
      },
      height: {
        screen: '100dvh',
      },
    },
  },
  plugins: [],
};
