// 此处也可引入外部模块webpack-merge来处理
const { entry, output, module: modules, plugins,resolve } = require('./webpack.common')
module.exports = {
    mode: 'production',
    entry,
    output,
    module: modules,
    plugins,
    resolve
};