<template>
	<view>
		<!-- 请选择收货地址的盒子 -->
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" class="btn-choose-address" @click="chooseAddress">请选择收货地址</button>
		</view>
		<!-- 收货地址信息 -->
		<view class="address-info-box" @click="chooseAddress" v-else>
			<view class="row1">
				<view class="row1-left">
					<view class="username">收货人：<text>{{address.userName}}</text></view>
				</view>
				<view class="row1-right">
					<view class="phone">电话：<text>{{address.telNumber}}</text></view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">{{ addstr }}</view>
			</view>
		</view>
		<!-- 底部线 -->
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		name: "my-address",
		data() {
			return {
				// address: {}
			};
		},

		computed: {
			...mapState('m_user', ['address']),
			...mapGetters('m_user', ['addstr'])
		},

		methods: {
			...mapMutations('m_user', ['updateAddress']),

			async chooseAddress() {
				let [err, succ] = await uni.chooseAddress().catch(err => err)
				if (err === null && succ.errMsg === 'chooseAddress:ok') {
					// this.address = succ
					this.updateAddress(succ)
				}

				// 如果用户没有授权
				if (err && (err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response')) {
					this.reAuth()
				}
			},

			// 重新发起收货地址的授权
			async reAuth() {
				// 提示对收货地址授权
				const [err2, confirmResult] = await uni.showModal({
					content: '您没有打开地址权限，是否去设置打开？',
					confirmText: '确认',
					cancelText: '取消'
				})

				// 如果弹框异常  直接退出
				if (err2) return

				// 点击了取消
				if (confirmResult.cancle) return uni.$showMsg('您取消了地址授权')

				// 点击确定
				if (confirmResult.confirm) return uni.openSetting({
					// 对授权结果判断
					success: (settingResult) => {
						// 授权成功
						if (settingResult.authSetting['scope.address']) return uni.$showMsg(
							'授权成功！请选择地址')
						// 授权失败
						// if(!settingResult.authSetting['scope.address']) return uni.$showMsg()
					}
				})
			}
		}

	}
</script>

<style lang="scss">
	.address-border {
		display: block;
		height: 5px;
		width: 100%;
	}

	.address-choose-box {
		height: 90px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.address-info-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 12px;
		height: 90px;
		padding: 0 5px;

		.row1 {
			display: flex;
			justify-content: space-between;

			.row1-right {
				display: flex;
				align-items: center;

				.phone {
					margin-right: 5px;
				}
			}
		}

		.row2 {
			display: flex;
			align-items: center;
			margin-top: 10px;

			.row2-left {
				white-space: nowrap;
			}
		}
	}
</style>
