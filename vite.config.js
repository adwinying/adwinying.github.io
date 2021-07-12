import { resolve } from 'path'
import handlebars from 'vite-plugin-handlebars'

export default {
  plugins: [
    handlebars({
      context: {
        navLinks: [
          { url: '#about', title: 'About' },
          { url: '#skills', title: 'Skills' },
          { url: '#projects', title: 'Projects' },
          { url: '#connect', title: 'Connect' },
        ],
      },
      partialDirectory: resolve(__dirname, 'partials'),
    }),
  ],
}
