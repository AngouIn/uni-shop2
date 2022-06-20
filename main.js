
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store/store'

import { $http } from './utils/request'
import requestUrl from './utils/requestUrl'

uni.$http = $http

// 保存路径
uni.$requestUrl = requestUrl

// 封装快速提示方法
uni.$showMsg = function(title = '数据加载失败！', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
		store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif