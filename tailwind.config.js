/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Roboto', 'ui-sans-serif', 'system-ui']
            },
            colors: {
                primary: {
                    50: '#E3F2FD', 100: '#BBDEFB', 200: '#90CAF9', 300: '#64B5F6', 400: '#42A5F5',
                    500: '#2196F3', 600: '#1E88E5', 700: '#1976D2', 800: '#1565C0', 900: '#0D47A1'
                },
                surface: { DEFAULT: '#FFFFFF', dark: '#121212' }
            }
        }
    },
    plugins: []
}
