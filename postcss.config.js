// postcss.config.js
module.exports = {
    plugins: [
        require('@tailwindcss/postcss'),  // Utilise le package correct pour Tailwind CSS
        require('autoprefixer'),
    ],
}
