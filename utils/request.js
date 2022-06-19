const baseUrl = 'https://api-ugo-web.itheima.net'

export function $http(url, data, method = 'GET') {
	uni.showLoading({
		title:'加载中...'
	})
	
	return new Promise(function(resolve, reject){
		
		uni.request({
			url: baseUrl + url,
			method: method,
			data: data,
			success: (res) => {
				resolve(res)
			},
			fail: (res) => {
				reject(res) 
			},
			complete: () => {
				uni.hideLoading()
			}
		})
	})
	
}