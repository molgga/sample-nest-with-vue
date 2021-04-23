/* eslint-disable */
const path = require('path');
const isBuild = process.env.BUILD;
const disableFriendlyError = isBuild;
const publicPath = '/';

const config = {
  publicPath,
  assetsDir: './',
  outputDir: '../../dist/client-dist',
  productionSourceMap: false,
  chainWebpack: config => {
    if (disableFriendlyError) {
      config.plugins.delete('friendly-errors');
    }
    config.plugins.delete('prefetch');
  },
  css: {
    // loaderOptions: {
    //   scss: {
    //     prependData: `@import "@/assets/styles/style.scss";`,
    //     sassOptions: {
    //       includePaths: [path.resolve(__dirname, 'node_modules/')]
    //     }
    //   }
    // }
  }
};

module.exports = config;
