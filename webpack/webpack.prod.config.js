const {
  merge
} = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const babelRule = {
  loader: 'babel-loader',
  options: {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            'chrome': '88',
            'ie': '11'
          },
          corejs: '3',
          useBuiltIns: 'usage'
        }
      ]
    ]
  }
};

const babelInsertRule = [
  (value) => typeof value?.use === 'string' && value?.use === 'ts-loader',
  (value) => Array.isArray(value?.use) && value?.use.includes('ts-loader')
];
baseConfig.module.rules.forEach(value => {
  if (babelInsertRule[0](value) || babelInsertRule[1](value)) {
    value.use = [
      babelRule,
      'ts-loader'
    ];
  }
});

const prodConfig = () => merge(baseConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // 是否生成注释文件
        extractComments: false
      }),
      new CssMinimizerPlugin({
        test: /\.css$/i,
        parallel: true
      })
    ],
    // runtimeChunk作用是为了线上更新版本时，充分利用浏览器缓存，加快页面加载速度
    runtimeChunk: {
      // name: (entrypoint) => `runtime~${entrypoint.name}`
      name: 'runtime'
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        babel: {
          test: /[\\/]node_modules[\\/](?:(@babel\/runtime)|(core-js))[\\/]/,
          name: 'babel',
          chunks: 'all'
        }
      }
    }
  }
});
console.log(prodConfig().module.rules);

module.exports = prodConfig;
