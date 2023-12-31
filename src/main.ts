import { createApp } from 'vue'
import App from './App.vue'
import { setupVab } from '~/library'
import { setupI18n } from '@/i18n'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import components from './components'
import './style/index.scss'
/**
 * @description 正式环境默认使用mock，正式项目记得注释后再打包
 */
import { baseURL, pwa } from './config'
import { isExternal } from '@/utils/validate'

const app = createApp(App)
app.use(components)
if (process.env.NODE_ENV === 'production' && !isExternal(baseURL)) {
  const { mockXHR } = require('@/utils/static')
  mockXHR()
}

/**
 * @description 生产环境启用组件初始化，编译，渲染和补丁性能跟踪。仅在开发模式和支持 Performance.mark API的浏览器中工作。
 */
//if (process.env.NODE_ENV === 'development') app.config.performance = true

if (pwa) require('./registerServiceWorker')

setupVab(app)
setupI18n(app)
setupStore(app)
setupRouter(app)
  .isReady()
  .then(() => app.mount('#app'))

const debounce = (fn: any, delay: any) => {
  let timer: any = null
  return function (...rest) {
    const context = this
    const args = rest
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

const _ResizeObserver = window.ResizeObserver
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback: any) {
    callback = debounce(callback, 16)
    super(callback)
  }
}
