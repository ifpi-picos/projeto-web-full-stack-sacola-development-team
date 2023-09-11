/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        aliceblue: {
          50: "#e6f5ff",
        },
        "blue-jeans": {
          50: "#1A202c",
        },
        "linear": {
          50:"linear-gradient(255deg, #1f1f1f, #2e2e2e, #3d3d3d);"
        },
        "azul-infos": {
          50:"#002664"
        },
        "azul-textos": {
          50:"#35B4FB"
        },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  }
}
