/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"PT Mono"', 'monospace'],
      },
      colors: {
        // Design system tokens
        'text-primary': '#101212',
        'text-secondary': '#798585',
        action: '#3e7c79',
        'action-muted': 'rgba(62,124,121,0.07)',
        'action-ring': 'rgba(62,124,121,0.3)',
        'table-header': '#edf2f7',
        'table-border': '#e9ebed',
        // Status
        'status-good': '#28a868',
        'status-good-bg': 'rgba(40,168,104,0.07)',
        'status-degraded': '#f59e0b',
        'status-bad': '#ef4444',
        // Specials
        'x509-text': '#02aee7',
        'x509-bg': 'rgba(2,174,231,0.08)',
        'workload-bar': 'rgba(2,124,231,0.5)',
        'x509-bar': 'rgba(2,174,231,0.5)',
        'jwt-bar': 'rgba(29,195,115,0.5)',
      },
      fontSize: {
        'h2': ['18px', { lineHeight: '1.5', letterSpacing: '0.36px' }],
        'h3': ['14px', { lineHeight: '1.5', letterSpacing: '0.28px' }],
        'body-sm': ['11px', { lineHeight: '1.5', letterSpacing: '0.22px' }],
        'overline': ['10px', { lineHeight: '1.5', letterSpacing: '0.8px' }],
        'badge': ['10px', { lineHeight: '1.5', letterSpacing: '0.2px' }],
        'mono': ['12px', { lineHeight: '1.5', letterSpacing: '0.24px' }],
        'body-md': ['13px', { lineHeight: '1.5', letterSpacing: '0.26px' }],
      },
    },
  },
  plugins: [],
}
