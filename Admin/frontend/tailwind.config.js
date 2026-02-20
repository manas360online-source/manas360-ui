/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                calm: {
                    blue: 'var(--calm-blue)',
                    lightBlue: 'var(--calm-light-blue)',
                    lavender: 'var(--calm-lavender)',
                    sand: 'var(--calm-sand)',
                    text: 'var(--calm-text)',
                    bg: 'var(--calm-bg)',
                }
            },
            fontFamily: {
                sans: ['Inter', 'Nunito', 'sans-serif'],
            },
            backgroundImage: {
                'calm-gradient': 'linear-gradient(to bottom, #E0EAFC, #CFDEF3)', // Soft cloud gradient
                'sunset-gradient': 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)', // Blue sky gradient
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            }
        },
    },
    plugins: [],
}
