<template>
	<view>
		<view class="search-box">
			<uni-search-bar cancelButton="none" radius="100" @input="input" :focus="true" placeholder="请输入搜索内容"></uni-search-bar>
		</view>
		
		<!-- 搜索历史 -->
		<view class="history-box" v-if="searchResults.length === 0">
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="20" @click="clearHistory"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag :inverted="true" :text="item" v-for="(item, i) in histories" :key="i" 
				custom-style="background-color: #efefef; border: none; padding: 4px 10px" 
				@click="gotoGoodsList(item)"
				></uni-tag>
			</view>
		</view>
		
		<!-- 搜索结果列表 -->
		<view class="sugg-list" v-else>
			<view class="sugg-item" v-for="(item, i) in searchResults" :key="item.goods_id" @click="togoDetail(item.goods_id)">
				<view class="goods-name">{{ item.goods_name }}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 搜索防抖  延时器id
				timer: null,
				kw: '',   // 输入的搜索关键词
				searchResults: [],
				historyList: [],  // 搜索历史
				
			};
		},
		
		computed: {
			histories() {
				//  翻转的查询历史
				return [...this.historyList].reverse()
			}
		},
		
		methods: {
			input(e) {
				// 清除延时器
				clearTimeout(this.timer)
				// 重启延时器
				this.timer = setTimeout(() => {
					// 如果 500 毫秒内内有再次输入，则为搜索关键词赋值
					this.kw = e
					this.getSearchList()
				}, 500)
			},
			
			async getSearchList() {
				if(this.kw === ''){
					this.searchResults = []
					return
				}
				let {data: res} = await uni.$http(uni.$requestUrl.qsearch, {query: this.kw})
				if(res.meta.status !== 200) return uni.$showMsg()
				this.searchResults = res.message
				
				// 查询后，把查询关键字添加到查询历史中
				this.saveSearchHistory()
			},
			
			gotoDetail(goods_id) {
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
				})
			},
			
			saveSearchHistory() {
				// this.historyList.push(this.kw)
				const set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList = Array.from(set)
				
				// 持久化到本地
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			
			clearHistory() {
				uni.showModal({
					title:'提示',
					content:'确认清空全部搜索记录？',
					success: (res) => {
						if(res.confirm) {
							console.log(111)
							this.historyList = []
							uni.setStorageSync('kw', '[]')
						}
					}
				})
			},
			
			gotoGoodsList(item) {
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query=' + item
				})
			}
		},
		
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || [])
		}
	}
</script>

<style lang="scss">
.search-box {
	position: sticky;
	top: 0;
	z-index: 999;
}

.sugg-list {
	padding: 0 5px;
	
	.sugg-item {
		font-size: 12px;
		padding: 13px 0;
		border-bottom: 1px solid #efefef;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		.goods-name {
			white-space: nowrap;
			overflow: hidden;
			// 文本溢出后，使用 ... 代替
			text-overflow: ellipsis;
			margin-right: 3px;
		}
	}
}

.history-box {
	padding: 0 5px;
	
	.history-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 40px;
		border-bottom: 1px solid #efefef;
		font-size: 14px;
	}
	
	.history-list {
		display: flex;
		flex-wrap: wrap;
		
		uni-tag {
			margin-top: 5px;
			margin-right: 5px;
		}
	}
}
</style>
