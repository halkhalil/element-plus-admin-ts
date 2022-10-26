import { defineConfig } from 'windicss/helpers';
import colors from 'windicss/colors'
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
    colors: {
      primary:'red'
    },
  },
  plugins: [
    // require('windicss/plugin/line-clamp'),
  ]
});
