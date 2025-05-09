/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // Add this for Next.js app dir support
  ],
  theme: {
    extend: {
      colors: {
        'gray-750': '#2d374d',
        border: 'hsl(240, 5%, 91%)',
        background: 'hsl(0, 0%, 100%)',
        foreground: 'hsl(240, 10%, 4%)',
        primary: '#6366f1', // optional, Indigo-500
        secondary: '#f43f5e', // optional, Rose-500
      },
    },
  },
  plugins: [],
};
