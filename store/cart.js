export default {
	namespaced: true,
	state: () => ({
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	
	mutations: {
		addToCart(state, goods) {
			// 如果购物车不存在这商品 直接添加，存在+1
			let findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
			if(findResult){
				// 存在
				findResult.goods_count++
			}else{
				state.cart.push(goods)
			}
			// 保存到本地
			this.commit('m_cart/saveToStorage')
		},
		
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		
		// 修改商品勾选状态方法
		updateGoodsState(state, goods) {
			let findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findResult) {
				findResult.goods_state = goods.goods_state
				this.commit('m_cart/saveToStorage')
			}
		},
		
		updateGoodsCount(state, goods) {
			let findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_count = goods.goods_count
				this.commit('m_cart/saveToStorage')
			}
		},
		
		removeGoodsById(state, goods_id) {
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			this.commit('m_cart/saveToStorage')
		},
		
		// 更新所有商品的勾选状态   全选或全不选
		updateAllGoodsState(state, newState){
			state.cart.forEach(x => x.goods_state = newState)
			this.commit('m_cart/saveToStorage')
		}
	},
	
	getters: {
		// 统计购物车商品总数量
		total(state) {
			let c = 0
			state.cart.forEach(goods => c += goods.goods_count)
			return c
		},
		
		// 统计已勾选的商品数量
		checkedCount(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		
		// 勾选商品总价
		checkedGoodsAmount(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_price * item.goods_count, 0).toFixed(2)
		}
	}
}