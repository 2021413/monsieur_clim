import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        muted: 'var(--muted)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'text-light': 'var(--text-light)',
        'text-dark': 'var(--text-dark)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui'],
      },
      keyframes: {
        'ken-burns': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' }
        }
      },
      animation: {
        'ken-burns': 'ken-burns 10s ease-in-out infinite alternate'
      }
    }
  },
  plugins: [],
};

export default config;
