const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
  // 构造器参数，用于传递options
  constructor(options) {
    console.log("current plugin option is " + JSON.stringify(options))
  }
  // apply 方法是一个插件所必须的
  apply(compiler) {
    // compiler就是当前的webpack实例
    // console.log(compiler.options)
    // compiler 继承自 tapable
    // tapable  提供了多种 hooks  https://github.com/webpack/tapable#hook-types
    // run      是 AsyncSeriesHook实例 [tapable提供的多种hooks的一种]
    compiler.hooks.run.tap(pluginName, compilation => {
      console.log('webpack 构建过程开始！',99999999);
    });
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin