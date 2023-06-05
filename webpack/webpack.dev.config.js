const {
  merge
} = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

module.exports = () => merge(baseConfig, {
  mode: 'development',
  devServer: {
    compress: true,
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    },
    // host: "0.0.0.0",
    port: 9000,
    hot: false,
    liveReload: true,
    open: true
    // 回调
    /*historyApiFallback: {
      rewrites: [{
        from: /^\/$/,
        to: '/html/index.html'
      }]
    }*/
    // 反向代理
    /* proxy: {
      '/api': 'http://localhost:3000',
    }, */
  }
});
