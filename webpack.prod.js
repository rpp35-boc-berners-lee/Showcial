const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
   mode: 'production',
   watch: true,
   watchOptions: {
      ignored: /node_modules/,
   },
   optimization: {
      minimize: true,
      usedExports: true,
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
   },
});
