module.exports = {
    content: [
        './src/**/*.{html,js,ts,jsx,tsx}', // your files
        './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}', // HeroUI
    ],
    darkMode: 'class',
    plugins: [
        require('@tailwindcss/typography'),
        // require('@heroui/theme/plugin'), (check their docs)
        function ({ addVariant }) {
            addVariant('dark', '&:is(.dark *)'); // your custom variant
        },
    ],
};
