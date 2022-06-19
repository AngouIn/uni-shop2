<template>
	<view>
		<view class="goods-list">
			<view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">
				<my-goods :goods="goods"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					query: '',  // 查询关键字
					cid: '',  // 商品分类id
					pagenum: 1,
					pagesize: 10
				},
				
				goodsList: [],
				total: 0,
				isloading: false
			};
		},
		
		methods: {
			async getGoodsList(cb) {
				this.isloading = true
				let {data: res} = await uni.$http(uni.$requestUrl.goodsList, this.queryObj)
				this.isloading = false
				// 数据请求完毕  关闭下拉刷新
				cb && cb()
				if(res.meta.status !== 200) return uni.showMsg()
				this.goodsList = [...this.goodsList, ...res.message.goods] 
				this.total = res.message.total
			},
			
			gotoDetail(goods){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
				})
			}
		},
			
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			
			this.getGoodsList()
		},
		
		onReachBottom() {
			// 判断是否还有下一页数据
			if(this.queryObj.pagesize * this.queryObj.pagenum >= this.total)
				return uni.$showMsg('没有更多了...')
			// 节流判断
			if(this.isloading) return
			this.queryObj.pagenum += 1
			this.getGoodsList()
		},
		
		onReady() {
			uni.setNavigationBarTitle({
				title: this.queryObj.query || '拼夕夕'
			})
		},
		
		onPullDownRefresh() {
			// 下拉刷新  重置关键数据
			this.queryObj.pagenum = 1
			this.total = 0
			this.isloading = false
			this.goodsList = []
			
			// 重新发起请求
			this.getGoodsList(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">

</style>
