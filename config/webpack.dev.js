const path = require('path');
// 此处也可引入外部模块webpack-merge来处理
const { entry, output, module:modules, plugins,resolve } = require('./webpack.common')
module.exports = {
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, '../build'), //会在根目录下隐式生成一个build文件夹以及开发过程中的所有可运行代码--存在于内存中
        compress: true, //置是否启用 Gzip 压缩
        port: 8090,
        open: true,
        hot: true
    },
    resolve,
    entry,
    output,
    module: modules,
    plugins
};