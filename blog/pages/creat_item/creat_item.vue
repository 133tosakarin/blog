<template>
	<view class="create_parent">
		<textarea maxlength="1000" class="textarea_style" placeholder="请输入帖子文本内容" v-model="content_text"></textarea>
		<view class="create_tools">
			<input class="img_url" type="text" maxlength="1000" placeholder="图片地址" v-model="img_1" />
			<input class="img_url" type="text" maxlength="1000" placeholder="图片地址" v-model="img_2" />
			<input class="img_url" type="text" maxlength="1000" placeholder="图片地址" v-model="img_3" />
			<input class="img_url" type="text" maxlength="1000" placeholder="图片地址" v-model="img_4" />
			<input class="img_url" type="text" maxlength="1000" placeholder="图片地址" v-model="img_5" />
			<input class="img_url" type="text" maxlength="1000" placeholder="图片地址" v-model="img_6" />
			<input class="video_url" type="text" maxlength="1000" placeholder="视频地址" v-model="video_1" />
		</view>
		<view class="send_item" @click="senditem">上传</view>
		
	</view>
	
</template>

<script setup>
	import {
		defineComponent
	} from 'vue'
	import {
		onTabItemTap
	} from '@dcloudio/uni-app'
	onTabItemTap(()=>{
		console.log("点击了增加帖子")
		let user_id = uni.getStorageSync("user_id")
		console.log("Creat_Item获取的UserId",user_id)
		if(user_id==null){
			uni.navigateTo({
				url:'/pages/login/login'
			})
		}
	})
	const connect_url = "http://172.22.9.9:7001/create"
	const my_url = "http://localhost:7001/"
	let content_text = '';
	let img_1 = '',
		img_2 = '',
		img_3 = '',
		img_4 = '',
		img_5 = '',
		img_6 = '',
		video_1 = ''
	let senditem = () => {
		let content_type = 1
		let imgs = [img_1, img_2, img_3, img_4, img_5, img_6]
		if (imgs[0] != '') content_type = 2
		if (video_1 != '') content_type = 3
		let real_img = ['']
		let user_id = uni.getStorageSync("user_id") 
		for(let i = 0; i<imgs.length;i++){
			if(imgs[i]!=''){real_img.push(imgs[i])}
		}
		console.log(real_img)
		real_img.shift()
		console.log("user_id: ",user_id)
		let send_item = {
			user_id: user_id,
			type: content_type,
			content_text: content_text,
			imgs: real_img,
			video: video_1,
			create_time: new Date().toLocaleString()
		}
		console.log(send_item)
		uni.request({
			method:'POST',
			url: connect_url,
			data: send_item,
			method:"POST",
			success(res) {
				console.log(res.data)
				if (res.data.success == true) {
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}
			}
		})
	}
</script>

<style>
	.create_parent {
		width: 750rpx;
		height: 750rpx;
	}

	.textarea_style {
		width: 690rpx;
		height: 700rpx;
		background-color: white;
		padding: 20rpx;
	}

	.create_tools {
		width: 750rpx;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.img_url {
		width: 355rpx;
		height: 60rpx;
		border-radius: 20rpx;
		margin-left: 5rpx;
		margin-top: 5rpx;
		padding: 5rpx;
		border: 1px rgb(200, 200, 200) solid;
		text-align: center;
		color: rgb(120, 120, 120);
	}

	.video_url {
		width: 725rpx;
		height: 60rpx;
		border-radius: 20rpx;
		margin-left: 5rpx;
		margin-top: 5rpx;
		padding: 5rpx;
		border: 1px rgb(200, 200, 200) solid;
		text-align: center;
		color: rgb(120, 120, 120);
	}

	.send_item {
		width: 150rpx;
		height: 80rpx;
		background-color: rgb(255, 144, 24);
		border-radius: 20rpx;
		text-align: center;
		line-height: 80rpx;
		color: white;
		font-weight: bold;
		margin-top: 20rpx;
		margin-left: 580rpx;
	}
	.get_img_file{
		width: 100rpx;
		height: 100rpx;
		background-color: turquoise;
		border-radius: 15rpx;
	}
</style>