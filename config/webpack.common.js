const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const myPlugin = require('../myLoaderAndPlugin/plugin')
module.exports = {
    // webpack 个生成的 Chunk 个名称， Chunk 的名称和 entry的配置有关。
    // ·如果 entry 是一 string array ，就只会生成 Chunk ，这时 Chunk 的名 main
    // ·如果 entry object ，就可能会出现多个 Chunk，这时 Chunk 的名称是object 键值对中键的名称。
    entry: path.resolve(__dirname, '../src/index'),
    output: {
        filename: '[name].bundle.js',
        //把一个路径或路径片段的序列解析为一个绝对路径
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, "../node_modules"),
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": ["@babel/preset-react", "@babel/preset-env"],
                        "plugins": ["@babel/plugin-transform-runtime"]
                    }
                },
            },
            {
                test: /\.(png$|svg$|eot$|woff$|ttf$)/,
                use: ['url-loader'],
                // loader: 'url-loader'
            },
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, "../src"),
                use: ['ts-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
        ]
    },
    resolve: {
        alias: { //配合tsconfig.json中的compilerOptions.paths才能生效
            "@": path.resolve(__dirname, '../src/')
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    // devtool 配置 Webpack 如何生成 Source Map 默认值是 false ，即不生成 Source
    // Map ，若想为构建出的代码生成 Source Map 以方便调试，则可以这样配置：
    // module.export = { devtool :'source-map'}
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
        }),
        new myPlugin()
    ]
}
