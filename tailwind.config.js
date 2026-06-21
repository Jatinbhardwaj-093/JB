/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      colors: {
        gruv: {
          bg: 'var(--bg-color)',
          fg: 'var(--fg-color)',
          card: 'var(--card-bg)',
          border: 'var(--border-color)',
          muted: 'var(--text-muted)',
          accent: 'var(--accent-color)',
          red: 'var(--gruv-red)',
          green: 'var(--gruv-green)',
          yellow: 'var(--gruv-yellow)',
          blue: 'var(--gruv-blue)',
          purple: 'var(--gruv-purple)',
          aqua: 'var(--gruv-aqua)',
          orange: 'var(--gruv-orange)'
        }
      }
    },
  },
  plugins: [],
};
