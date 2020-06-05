const {resolve} = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',

  // 将构建好的文件输出到哪里
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',

  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: false,

  // 使用带有浏览器内编译器的完整构建版本
  // 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
  // compiler: false,

  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,

  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md
  chainWebpack: (config) => {
    config.module.rules.delete('svg') // 重点:删除默认配置中处理svg,
    // const svgRule = config.module.rule('svg')
    // svgRule.uses.clear()
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  configureWebpack: (config) => {
    config.resolve = {
      extensions: ['.js','vue','.json'],
      alias: {
        '@': resolve(__dirname,'./src')
      }
    }
  },

  // CSS 相关选项
  css: {
      // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
      // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
      extract: true,

      // 是否开启 CSS source map？
      sourceMap: false,

      // 为预处理器的 loader 传递自定义选项。比如传递给
      // sass-loader 时，使用 `{ sass: { ... } }`。
      loaderOptions: {
        sass: {
          prependData: `@import "./src/styles/main.scss";`
        }
      },

      // 为所有的 CSS 及其预处理文件开启 CSS Modules。
      // 这个选项不会影响 `*.vue` 文件。
      modules: false
  },

  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require('os').cpus().length > 1,

  // PWA 插件的选项。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-pwa/README.md
  pwa: {},

  // devServer: {
  //   open: false, // 编译完成是否打开网页
  //   host: '0.0.0.0', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
  //   port: 8080, // 访问端口
  //   https: false, // 编译失败时刷新页面
  //   hot: true, // 开启热加载
  //   hotOnly: false,
  //   proxy: {
  //     '/devApi': {
  //         target: "http://www.web-jshtml.cn/productapi/token",
  //         changeOrigin: true,
  //         pathRewrite: {
  //             '^/devApi': ''
  //         }
  //     }
  //   },
  //   overlay: { // 全屏模式下是否显示脚本错误
  //     warnings: true,
  //     errors: true
  //   },
  //   before: app => {
  //   }
  // },

  // 第三方插件的选项
  pluginOptions: {

  }
}