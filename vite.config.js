import shopify from 'vite-plugin-shopify'

export default {
  plugins: [
    shopify({
        themeRoot: './',
        sourceCodeDir: "src",
        entrypointsDir: "src",
        additionalEntrypoints: ['src/**/*.{scss, js}']
    })
  ]
}