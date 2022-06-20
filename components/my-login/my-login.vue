<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		<view class="tips-text">登录后尽享更多权益</view>
	</view>
</template>

<script>
	import { mapMutations, mapState } from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		
		computed: {
			...mapState('m_user', ['redirectInfo'])
		},
		
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
			
			getUserInfo(e) {
				// 判断是否成功获取用户信息
				 if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
				 // 把用户信息存到 vuex 中
				 this.updateUserInfo(e.detail.userInfo)
				 
				 // 获取登录的 token
				 this.getToken(e.detail)
			},
			
			// 登录
			async getToken(info) {
				// 调用微信登录接口
				let [err, res] = await uni.login().catch(err => err)
				// 判断调用是否失败
				if(err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败--接口调用失败')
				
				// 参数对象
				// let query = {
				// 	code: res.code,
				// 	encryptedData: info.encryptedData,
				// 	iv: info.iv,
				// 	rawData: info.rawData,
				// 	signature: info.signature
				// }
				
				// let {data: loginResult} = await uni.$http(uni.$requestUrl.token, query, 'POST')
				// if(loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
				// this.updateToken(loginResult.message.token)
				
				// 这里由于登录接口用不了， 所以生成一个假的token
				let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpUENHVERmYWJCNThBNENlZG9Wa3VweXdVeU0ifQ.eyJqdGkiOiIzWUJ5eWZ2T.JSUzI1NiIsInR5cCI6IkpUENHVER'
				this.updateToken(token)
				
				// 登录成功后，返回原来的页面
				this.navigateBack()
			},
			
			// 返回原来的页面
			navigateBack() {
				if(this.redirectInfo && this.redirectInfo.openType === 'switchTab'){
					uni.switchTab({
						url: this.redirectInfo.from,
						complete: () => {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.login-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 750rpx;
	background-color: #f8f8f8;
	
	.btn-login {
		width: 90%;
		border-radius: 100px;
		margin: 15px 0;
		background-color: #c00000;
	}
	
	.tips-text {
		font-size: 12px;
		color: gray;
	}
	
	
}
</style>