export default {
	namespaced: true,
	
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorageSync('token') || '',
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		redirectInfo: null
	}),
	
	mutations: {
		updateAddress(state, address) {
			state.address = address
			this.commit('m_user/saveAddressToStorage')
		},
		
		// 持久化到本地
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		
		// 更新用户信息
		updateUserInfo(state, userinfo) {
			state.userinfo = userinfo
			this.commit('m_user/saveUserInfoToStorage')
		},
		
		// 把用户信息持久化
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},
		
		updateToken(state, token){
			state.token = token
			this.commit('m_user/saveTokenToStorage')
		},
		
		saveTokenToStorage(state){
			uni.setStorageSync('token', state.token)
		},
		
		updateRedirectInfo(state, info){
			state.redirectInfo = info
		}
		
	},
	
	getters: {
		addstr(state) {
			if(!state.address.provinceName) return ''
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	},
}