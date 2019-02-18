const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = (env, argv) => {
    const isProd = argv.mode === 'production'
    return {
        entry: {
            'index': path.resolve(__dirname, './src/index.js')
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: "themes.js"
        },
        module: {
            rules: [
                {
                    test: /\.styl$/,
                    use: [
                        isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
                        "css-loader",
                        "stylus-loader"
                    ]
                },
                {
                    test: /\.(png|gif|jpg)$/,
                    use: {
                        loader: 'url-loader'
                    }
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name].css",
            }),
            new HtmlWebpackPlugin({
                template: './src/index.htm',
                filename: 'index.html'
            }),
            new webpack.HotModuleReplacementPlugin({
                // Options...
            })
        ],
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9000,
            hot: true,
        }
    }
}