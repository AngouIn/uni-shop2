import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from '@/store/cart.js'
import moduleUser from '@/store/user.js'

// 将vuex安装为vue的插件
Vue.use(Vuex)

// 创建 store 的实例对象
const store = new Vuex.Store({
	modules: {
		m_cart: moduleCart,
		m_user: moduleUser
	}
})

export default store