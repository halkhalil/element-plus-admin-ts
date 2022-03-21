import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  extract: {
    include: ['src/**/*.{vue,html,jsx,tsx}', 'public/**/*.{html}', './*.html'],
    exclude: ['node_modules', '.git', './stats.html']
  },
  darkMode: 'class',
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-center': 'flex justify-center items-center',
    'flex-between': 'flex justify-between items-center',
    'flex-col-center': 'flex-center flex-col',
    'flex-col-between': 'flex-between flex-col',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex justify-center flex-col',
    'flex-x-between':'flex justify-between',
    'flex-y-between':'flex justify-between flex-col',

    'i-flex-center': 'inline-flex justify-center items-center',
    'i-flex-x-center': 'inline-flex justify-center',
    'i-flex-y-center': 'inline-flex items-center',
    'i-flex-col': 'inline-flex flex-col',
    'flex-1-hidden': 'flex-1 overflow-hidden',
    'transition-base': 'transition-all duration-300 ease-in-out'
  },
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        'primary-hover': 'var(--primary-color-hover)',
        'primary-pressed': 'var(--primary-color-pressed)',
        'primary-active': 'var(--primary-color-active)',
        info: 'var(--info-color)',
        'info-hover': 'var(--info-color-hover)',
        'info-pressed': 'var(--info-color-pressed)',
        'info-active': 'var(--info-color-active)',
        success: 'var(--success-color)',
        'success-hover': 'var(--success-color-hover)',
        'success-pressed': 'var(--success-color-pressed)',
        'success-active': 'var(--success-color-active)',
        warning: 'var(--warning-color)',
        'warning-hover': 'var(--warning-color-hover)',
        'warning-pressed': 'var(--warning-color-pressed)',
        'warning-active': 'var(--warning-color-active)',
        error: 'var(--error-color)',
        'error-hover': 'var(--error-color-hover)',
        'error-pressed': 'var(--error-color-pressed)',
        'error-active': 'var(--error-color-active)'
      },
      backgroundColor: {
        dark: '#18181c',
        'dark-base': '#101014'
      },
      textColor: {
        'black-base': '#333639',
        'white-base': 'rgba(255, 255, 255, 0.82)'
      },
      transitionProperty: [
        'width',
        'height',
        'background',
        'background-color',
        'padding-left',
        'border-color',
        'right',
        'fill'
      ],
    }
  },
  variants: {},
  plugins: [
    require('windicss/plugin/line-clamp'),
  ]
});
