<template>
	<view class="my-settle-container">
		<!-- 全选 -->
		<label class="radio" @click="changeAllState">
			<radio color="#c00000" :checked="isFullCheck" /><text>全选</text>
		</label>
		
		<!-- 合计 -->
		<view class="amount-box">
			合计：<text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>
		
		<!-- 结算按钮 -->
		<view class="btn-settle" @click="settlement">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations, mapState } from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				seconds: 3,  // 倒计时
				timer: null
			};
		},
		
		computed: {
			...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
			
			...mapGetters('m_user', ['addstr']),
			
			...mapState('m_user', ['token']),
			
			// 是否是全选
			isFullCheck() {
				return this.total === this.checkedCount
			}
		},
		
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			...mapMutations('m_user', ['updateRedirectInfo']),
			
			changeAllState() {
				this.updateAllGoodsState(!this.isFullCheck)
			},
			
			// 结算
			settlement() {
				// 1 判断是否勾选了商品
				if(!this.checkedCount) return uni.$showMsg('请选择要结算的商品')
				
				// 2 判断用户是否选择了收货地址
				if(!this.addstr) return uni.$showMsg('请选择收货地址')
				
				// 3 判断是否登录
				// if(!this.token) return uni.$showMsg('请先登录')
				if(!this.token) return this.delayNavigate()
				
				// 结算
				uni.$showMsg('我劝你别买！')
			},
			
			// 延时导航到登录页
			delayNavigate() {
				this.seconds = 3
				this.showTips(this.seconds)
				
				this.timer = setInterval(() => {
					this.seconds--
					if(this.seconds <= 0){
						clearInterval(this.timer)
						uni.switchTab({
							url:'/pages/my/my',
							success: () => {
								// 将跳转信息存到 vuex 中，以便登录成功后跳转回来
								this.updateRedirectInfo({
									// 跳转的方式
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						})
						return
					}
					this.showTips(this.seconds)
				}, 1000)
			},
			
			// 展示计时的提示信息
			showTips(n) {
				uni.showToast({
					icon: 'none',
					title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
					mask: true,  // 添加遮罩  防止点击穿透
					duration: 1500
				})
			}
		}
	}
</script>

<style lang="scss">
.my-settle-container {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	background-color: white;
	
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: 5px;
	font-size: 14px;
	
	.radio {
		display: flex;
		align-items: center;
	}
	
	.amount {
		color: #c00000;
	}
	
	.btn-settle {
		height: 50px;
		min-width: 100px;
		background-color: #c00000;
		color: white;
		line-height: 50px;
		text-align: center;
		padding: 0 10px;
	}
	
}
</style>