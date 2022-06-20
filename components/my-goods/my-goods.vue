<template>
	<view>
		<view class="goods-item">
			<!-- 左侧图片区域 -->
			<view class="goods-item-left">
				<radio :checked="goods.goods_state" color="#c00000" v-if="isShowRadio" @click="radioClickHandler"></radio>
				<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
			</view>
			<!-- 右侧信息区域 -->
			<view class="goods-item-right">
				<view class="goods-name">{{ goods.goods_name }}</view>
				<view class="goods-info-box">
					<view class="goods-price">￥{{ goods.goods_price | toFixed }}</view>
					<uni-number-box 
						:min="1" 
						:value="goods.goods_count" 
						v-if="isShowNumberBox" 
						@change="numChangeHandler">
					</uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		
		props: {
			goods: {
				type: Object,
				default: {}
			},
			
			// 是否显示勾选  只有在购物车页面才显示
			isShowRadio: {
				type: Boolean,
				default: false
			},
			
			// 是否显示 Numberbox组件 只有在购物车才显示
			isShowNumberBox: {
				type: Boolean,
				default: false
			}
		},
		
		filters: {
			toFixed(num) {
				return Number(num).toFixed(2)
			}
		},
		
		methods: {
			radioClickHandler(){
				this.$emit('radio-change', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			
			numChangeHandler(val) {
				this.$emit('num-change', {
					goods_id: this.goods.goods_id,
					goods_count: +val
				})
			}
		}
	}
</script>

<style lang="scss">
.goods-item {
	display: flex;
	padding: 10px 15px;
	border-bottom: 1px solid #f0f0f0;
	
	width: 750rpx;
	box-sizing: border-box;
	
	.goods-item-left {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-right: 5px;
		.goods-pic {
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	
	.goods-item-right {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 5px;
		
		.goods-name {
			font-size: 13px;
		}
		
		.goods-info-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		
		.goods-price {
			font-size: 16px;
			color: #c00000;
		}
	}	
}
</style>
