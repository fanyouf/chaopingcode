// 自动注册全局组件，每次新增组件必须重新编译

const requireComponent = require.context(
  './', // 其组件目录的相对路径
  true, // 是否查询其子目录
  /\.vue$/ // 匹配基础组件文件名的正则表达式
)

export default {
  install(app) {
    requireComponent.keys().forEach((fileName) => {
      const componentConfig = requireComponent(fileName) // 获取组件配置
      const componentName = fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
      /**
       * 兼容 import export 和 require module.export 两种规范
       */
      // 如果这个组件选项是通过 export default 导出的,就会优先使用 .default
      const comp = componentConfig.default || componentConfig
      app.component(componentName, comp) // 此处的name是组件属性定义的name
    })
  },
}
