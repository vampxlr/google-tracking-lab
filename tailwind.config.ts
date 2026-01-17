import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Existing shadcn colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Google Brand Colors
        'google': {
          orange: '#FF6D00',
          'orange-light': '#FFB74D',
          'orange-dark': '#E65100',
          blue: '#4285F4',
          green: '#34A853',
          yellow: '#FBBC04',
          red: '#EA4335',
        },
        // Hacker theme colors (Orange-focused)
        'hacker': {
          bg: {
            primary: '#0a0e1a',
            secondary: '#0f1419',
            card: '#151b26',
          },
          accent: {
            primary: '#FF6D00',    // Orange
            secondary: '#4285F4',  // Google Blue
            tertiary: '#ff006e',   // Pink for errors
          },
          text: {
            primary: '#e8f4f8',
            secondary: '#8b949e',
            accent: '#FF6D00',
          },
          code: {
            bg: '#0d1117',
            text: '#FF6D00',
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "glow-orange": {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(255, 109, 0, 0.5), 0 0 10px rgba(255, 109, 0, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 10px rgba(255, 109, 0, 0.8), 0 0 20px rgba(255, 109, 0, 0.5)' 
          },
        },
        "glow": {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(255, 109, 0, 0.5), 0 0 10px rgba(255, 109, 0, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 10px rgba(255, 109, 0, 0.8), 0 0 20px rgba(255, 109, 0, 0.5)' 
          },
        },
        "shimmer": {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        "scan-line": {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        "pulse-glow": {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        "border-beam": {
          '0%': { 'offset-distance': '0%' },
          '100%': { 'offset-distance': '100%' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow-orange": "glow-orange 2s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "scan-line": "scan-line 3s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "border-beam": "border-beam 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
