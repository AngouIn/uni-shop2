// 设置购物车角标的代码
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters('m_cart', ['total'])
	},
	
	watch: {
		total() {
			this.setBadge()
		}
	},
	
	methods: {
		setBadge() {
			if(this.total !== 0){
				uni.setTabBarBadge({
					index: 2,
					text: this.total + '',
					// animation: true
				})
			}else{
				uni.removeTabBarBadge({
					index: 2
				})
			}
		}
	},
	
	onShow() {
		this.setBadge()
	},
	
	
}