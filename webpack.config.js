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
 * @param {boolean} sourceMap
 * @returns {{}}
 */
const config = (name, target, sourceMap) => {
    return {
        name: name,
        entry: path.resolve(__dirname, 'src', 'index.js'),
        mode: sourceMap ? 'development' : 'production',
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
        devtool: sourceMap ? 'eval-source-map' : false,
        devServer: sourceMap ? {
            contentBase: path.resolve(__dirname),
            compress: true,
            host: 'localhost',
            port: 9000,
            writeToDisk: true
        } : undefined,
        optimization: {
            minimize: true,
            minimizer: [
                new TerserWebpackPlugin({
                    extractComments: false,
                    terserOptions: sourceMap ? {
                        sourceMap: true
                    } : undefined
                })
            ]
        },
        output: {
            filename: 'chart-data-source.min.js',
            path: path.resolve(...target)
        },
        performance: {
            hints: false
        },
        plugins: [
            new WebpackBannerPlugin({
                banner: banner
            })
        ]
    };
};

module.exports = [
    config('development', [__dirname, 'demo', 'dist'], true),
    config('production', [__dirname, 'dist'], false)
];

module.exports.parallelism = 2;