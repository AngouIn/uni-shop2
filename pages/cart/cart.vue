<template>
	<view class="cart-container" v-if="cart.length !== 0">
		<!-- 收货地址 -->
		<my-address></my-address>
		<!-- 商品列表标题 -->
		<view class="cart-title">
			<uni-icons type="shop" size="20"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		<!-- 商品列表区域 -->
		<uni-swipe-action>
			<block v-for="(item, i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swiperActionClick(item)">
					<my-goods
						:goods="item" 
						:isShowRadio="true" 
						:isShowNumberBox="true" 
						@radio-change="radioChangeHandler" 
						@num-change="numChangeHandler">
					</my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<!-- 结算 -->
		<my-settle></my-settle>
	</view>
	
	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text class="tip-text">空空如也~</text>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import { mapState, mapMutations } from 'vuex'
	export default {
		mixins: [badgeMix],
		
		data() {
			return {
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#c00000'
						}
					}
				]
			};
		},
		
		computed: {
			...mapState('m_cart', ['cart'])
		},
		
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
			
			radioChangeHandler(e){
				this.updateGoodsState(e)
			},
			
			numChangeHandler(e) {
				this.updateGoodsCount(e)
			},
			
			swiperActionClick(goods){
				this.removeGoodsById(goods.goods_id)
			}
		}
		
	}
</script>

<style lang="scss">
.cart-container {
	padding-bottom: 50px;
}
	
.cart-title {
	height: 40px;
	display: flex;
	align-items: center;
	font-size: 14px;
	padding-left: 5px;
	border-bottom: 1px solid #efefef;
	.cart-title-text {
		margin-left: 10px;
	}
}

.empty-cart {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 150px;
	
	.empty-img {
		//display: block;
		height: 90px;
		width: 90px;
	}
	
	.tip-text {
		font-size: 12px;
		color: gray;
		margin-top: 15px;
	}
}


</style>
