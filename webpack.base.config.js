const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    serverPath: path.join(__dirname, 'dist'),
    assets: '/'

}

module.exports = {

    externals: {
        paths: PATHS
    },

    entry: {
        app: './src/js/index.js'
    },

    output: {
        filename: 'js/[name].js',
        path: PATHS.dist,
        // publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules/"
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {sourceMap: true}

                    },
                    {
                        loader: "sass-loader",
                        options: {sourceMap: true}
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: {
                                path: './src/js/config/postcss.config.js'
                            }
                        }

                    },

                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {sourceMap: true}

                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: {
                                path: './src/js/config/postcss.config.js'
                            }
                        }

                    }
                ]
            }

        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            JQ: 'jquery'
        }),
        new MiniCssExtractPlugin({
            filename: `css/[name].css`
            // chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            hash: false,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: `${PATHS.src}/images`, to: `${PATHS.dist}/images`
            }
        ]),

    ],

}
