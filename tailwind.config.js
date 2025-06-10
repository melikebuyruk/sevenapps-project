/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            ul: {
              paddingLeft: '1.5em',
              listStyleType: 'disc',
            },
            ol: {
              paddingLeft: '1.5em',
              listStyleType: 'decimal',
            },
            li: {
              marginTop: '0.25em',
              marginBottom: '0.25em',
            },
          },
        },
      }),
    },
  },
  darkMode: "class",
  plugins: [require('@tailwindcss/typography')],
}

