/** @type {import('tailwindcss').Config} */
import { brand, surface, slate } from './src/config/colors'

export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: brand.primary,
                    'primary-light': brand.secondary,
                    dark: brand.dark,
                    'dark-light': brand.darkLight,
                },
                surface: {
                    DEFAULT: surface.white,
                    page: surface.page,
                    muted: surface.muted,
                },
                slate: {
                    50: slate[50],
                    100: slate[100],
                    200: slate[200],
                    300: slate[300],
                    400: slate[400],
                    500: slate[500],
                    600: slate[600],
                    700: slate[700],
                    800: slate[800],
                    900: slate[900],
                },
            },
            boxShadow: {
                'brand-active': `0 4px 14px ${brand.primary}59`,
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
        },
    },
    plugins: [],
}
