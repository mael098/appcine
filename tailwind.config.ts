import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
        colors: {
            ...colors,
            light: {
                50: '#f8f9fa',
                100: '#eceff2',
                200: '#d6dce1',
                300: '#b2bec7',
                400: '#889ba8',
                500: '#697e8e',
                600: '#546775',
                700: '#45535f',
                800: '#3c4750',
                900: '#353d45',
                950: '#23292e',
            },
        }
    },
    plugins: [],
}
export default config
