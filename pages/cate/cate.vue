<template>
	<view>
		<view class="scroll-container">
			<!-- 左侧 -->
			<scroll-view class="left-scroll" scroll-y="true" :style="{height: wh + 'px'}">
				<block v-for="(item, i) in cateList" :key="item.cat_id">
					<view :class="['left-scroll-item', i === active ? 'active' : '']" @click="activeChanged(i)">{{ item.cat_name }}</view>
				</block>
			</scroll-view>
			<!-- 右侧 -->
			<scroll-view class="right-scroll" scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2, i2) in cateLevel" :key="i2">
					<view class="cate-lv2-title">{{ item2.cat_name }}</view>
					<view class="cate-lv3">
						<view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon.replace('dev', 'web')"></image>
							<text>{{ item3.cat_name }}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh: 0, // 窗口的可用高度 = 总高度 - navigationBar高度 - tabBar高度
				cateList: [],
				active: 0, // 当前选中
				cateLevel: [],
				scrollTop: 0,
			};
		},
		
		methods: {
			async getCateList() {
				let {data: res} = await uni.$http(uni.$requestUrl.cate_list)
				if(res.meta.status !== 200) return uni.showMsg()
				this.cateList = res.message
				
				// 二级分类
				this.cateLevel = res.message[0].children
			},
			
			activeChanged(i) {
				this.active = i
				this.cateLevel = this.cateList[i].children
				
				//修改滚动条位置
				this.scrollTop = this.scrollTop === 0 ? 1 : 0  // 如果给scrollTop赋同样的值会不生效
			},
			
			gotoGoodsList(item) {
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid=' + item.cat_id
				})
			}
		},

		onLoad() {
			this.wh = uni.getSystemInfoSync().windowHeight
			this.getCateList()
		}
	}
</script>

<style lang="scss">
.scroll-container {
	display: flex;
	background-color: #ffffff;
	
	.left-scroll {
		width: 120px;
		
		.left-scroll-item {
			line-height: 60px;
			background-color: #f7f7f7;
			text-align: center;
			font-size: 12px;
			
			&.active {
				background-color: #ffffff;
				position: relative;
				
				&::before {
					content: '';
					display: block;
					width: 2px;
					height: 40px;
					background-color: #c00000;
					position: absolute;
					left: 0%;
					top: 50%;
					transform: translateY(-50%);
				}
				
			}
		}
	}
	
	.right-scroll {
		.cate-lv2-title {
			font-size: 12px;
			font-weight: bold;
			text-align: center;
			padding: 15px 0;
		}
		
		.cate-lv3 {
			display: flex;
			flex-wrap: wrap;
			
			.cate-lv3-item {
				width: 33.33%;
				margin-bottom: 10px;
				display: flex;
				flex-direction: column;
				align-items: center;
				
				image {
					width: 60px;
					height: 60px;
				}
				
				text {
					font-size: 12px;
				}
			}
		}
	}
}
</style>
