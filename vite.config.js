import { resolve } from 'path'
import handlebars from 'vite-plugin-handlebars'
import context from './data'

export default {
  plugins: [
    handlebars({
      context,
      partialDirectory: resolve(__dirname, 'partials'),
      helpers: {
        iconPath: (iconName) => `icons/${iconName}`,
      },
    }),
  ],
}
