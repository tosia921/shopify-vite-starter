import shopify from 'vite-plugin-shopify'
import copy from 'rollup-plugin-copy'

export default {
  plugins: [
    shopify({
        themeRoot: './',
        sourceCodeDir: "src",
        entrypointsDir: "src",
        additionalEntrypoints: ['src/**/*.{scss, js}']
    }),
    copy({
      targets: [
        { src: 'src/assets/**/*', dest: 'assets' },
      ]
    })
  ]
}