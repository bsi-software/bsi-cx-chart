'use strict';

const path = require('path');

const TerserWebpackPlugin = require('terser-webpack-plugin');
const WebpackBannerPlugin = require('webpack').BannerPlugin;

const packageJson = require('./package.json');

const banner = [
  `@name ${packageJson.name}`,
  `@description ${packageJson.description}`,
  `@version ${packageJson.version}`,
  `@author ${packageJson.author}`,
  `@license ${packageJson.license}`
].join('\n');

/**
 * @param {string} name
 * @param {string[]} target
 * @param {boolean} integratedSourceMap
 * @returns {{}}
 */
const config = (name, target, integratedSourceMap) => ({
  name: name,
  entry: path.resolve(__dirname, 'src', 'index.js'),
  mode: integratedSourceMap ? 'development' : 'production',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              useBuiltIns: 'usage',
              shippedProposals: true,
              corejs: {
                version: 3,
                proposals: false
              }
            }]],
            sourceType: 'unambiguous'
          }
        }
      }
    ]
  },
  devtool: integratedSourceMap ? 'eval' : 'source-map',
  devServer: integratedSourceMap ? {
    static: {
      directory: path.resolve(__dirname, 'demo')
    },
    devMiddleware: {
      writeToDisk: true
    },
    host: 'localhost',
    port: 9000
  } : undefined,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        extractComments: false,
        terserOptions: integratedSourceMap ? {
          sourceMap: true
        } : undefined
      })
    ]
  },
  externals: {
    'chart.js/auto': {
      commonjs: 'chart.js/auto',
      commonjs2: 'chart.js/auto',
      root: 'Chart'
    }
  },
  output: {
    filename: 'chart-url-provider.min.js',
    path: path.resolve(...target),
    library: {
      type: 'umd'
    },
    globalObject: 'this',
    clean: true
  },
  performance: {
    hints: false
  },
  plugins: [
    new WebpackBannerPlugin({
      banner: banner
    })
  ]
});

module.exports = [
  config('development', [__dirname, 'demo', 'dist'], true),
  config('production', [__dirname, 'dist'], false)
];

module.exports.parallelism = 2;
