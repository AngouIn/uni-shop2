<template>
	<view v-if="goods_info.goods_name" class="goods-detail-container">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in goods_info.pics" :key="i">
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>

		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="goods-price">￥{{ goods_info.goods_price }}</view>
			<!-- 主体信息 -->
			<view class="goods-info-body">
				<!-- 名称 -->
				<view class="goods-name">{{ goods_info.goods_name }}</view>
				<!-- 收藏 -->
				<view class="goods-favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 快递 -->
			<view class="yf">快递：免运费</view>
		</view>

		<rich-text :nodes="goods_info.goods_introduce"></rich-text>

		<!-- 商品导航组件 -->
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_info: {}, // 商品详情对象
				// 商品导航
				// 左侧按钮组的配置对象
				options: [
					{
						icon: 'shop',
						text: '店铺'
					},
					{
						icon: 'cart',
						text: '购物车',
						info: 2
					}
				],
				// 右侧按钮
				buttonGroup: [
					{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]

			};
		},

		methods: {
			async getGoodsDetail(goods_id) {
				let {
					data: res
				} = await uni.$http(uni.$requestUrl.goods_detail, {
					goods_id
				})
				if (res.meta.status !== 200) return uni.showMsg()
				// 给服务器返回的 HTML 字符串中的 img 标签添加 display: block 样式
				// 解决图片之间留白问题
				// 还有解决 .webp 格式图片在 iOS 上无法正常显示问题
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;"').replace(/webp/g, 'jpg')
				this.goods_info = res.message
			},

			preview(i) {
				// 预览
				uni.previewImage({
					current: i,
					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			},
			
			onClick(e) {
				if(e.content.text === '购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			
			buttonClick(e) {
				uni.$showMsg('没钱买！')
			}
		},

		onLoad(options) {
			this.getGoodsDetail(options.goods_id)
		},	
	}
</script>

<style lang="scss">
	.goods-detail-container {
		// 防止信息被商品导航遮住
		padding-bottom: 90px;
		background-color: #efefef;
	}
	
	
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info-box {
		padding: 10px;
		border-radius: 8px;
		background-color: #fff;
		margin: 8px;

		.goods-price {
			font-size: 18px;
			color: #c00000;
			margin: 15px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 14px;
				padding-right: 10px;
			}

			.goods-favi {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 120px;
				font-size: 12px;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

		.yf {
			font-size: 12px;
			color: gray;
			margin: 15px 0 20px 0;
		}
	}
	
	// 商品导航  固定定位
	.goods-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 90px;
		background-color: #fff;
	}
	
</style>
