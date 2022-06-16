<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		
		<!-- 分类导航区 -->
		<view class="nav_list">
			<view class="nav_item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
				<image :src="item.image_src" class="nav_img"></image>
			</view>
		</view>
		
		<!-- 楼层 -->
		<view class="floor_list">
			<view class="floor_item" v-for="(item,i) in floorList" :key="i">
				<image :src="item.floor_title.image_src" class="floor_title"></image>
				<view class="floor_img_box">
					<!-- 左侧大图片 -->
					<navigator class="left_img_box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" mode="widthFix" :style="{width: item.product_list[0].image_width + 'rpx'}"></image>
					</navigator>
					<!-- 右侧四个小图 -->
					<view class="right_img_box">
						<navigator class="right_img_item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
							<image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图数据
				swiperList: [],
				// 分类导航
				navList: [],
				// 楼层
				floorList: []
			};
		},

		methods: {
			async getSiperList() {
				let {data: res} = await uni.$http(uni.$requestUrl.swiper)
				// 请求失败
				if (res.meta.status !== 200) return uni.$showMsg()
				// 请求成功
				this.swiperList = res.message
			},

			async getNavList() {
				let { data: res} = await uni.$http(uni.$requestUrl.nav)
				if(res.meta.status !== 200) return uni.$showMsg()	
				this.navList = res.message
			},
			
			async getFloorList() {
				let {data: res} = await uni.$http(uni.$requestUrl.floor)
				if(res.meta.status !== 200) return uni.$showMsg()
				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			},
			
			// 点击导航
			navClickHandler(item) {
				// 判断点击了哪个导航项
				switch(item.name) {
					case '分类':
					uni.switchTab({
						url:'/pages/cate/cate'
					})
					break
					default:
					uni.switchTab({
						url:'../my/my'
					})
				} 
			}
		},

		onLoad() {
			this.getSiperList()
			this.getNavList()
			this.getFloorList()
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.nav_list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;
		
		.nav_img {
			height: 125rpx;
			width: 140rpx;
		}
	}
	
	.floor_list  {
		.floor_title {
			height: 60rpx;
			width: 100%;
			display: flex;
		}
		.floor_img_box {
			display: flex;
			padding-left: 10rpx;
			.right_img_box {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
			}
		}	
	}
</style>
