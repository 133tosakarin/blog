<template>
	<view>

		<scroll-view class="scroll_view" scroll-y="true" :scroll-top="scroll_top">
			<view class="content">
				<view v-for="item in items">
					<view v-if="item.is_own == false">

						<view class="leftbox">
							<image class="leftbox_img" :src="item.src"></image>
							<view class="leftbox_text">
								{{item.message}}
							</view>
						</view>
					</view>
					<view v-else>
						<view class="rightbox">

							<view class="rightbox_text">
								{{item.message}}
							</view>
							<image class="rightbox_img" :src="item.src"></image>
						</view>
					</view>
				</view>
			</view>


		</scroll-view>



		<view class="bottombar">
			<input class="chatinput" type="text" v-model="input_msg" />
			<button class="sendbtn" @click="SendMessage()">发送</button>

		</view>
	</view>
</template>

<script setup>
	
	import {
		ref,
		nextTick
	} from 'vue'
	const url = "http://172.22.9.9:7001/aichat"
	let items = ref([{
			src: "https://img0.baidu.com/it/u=774820494,3487643102&fm=253&fmt=auto&app=138&f=JPEG?w=457&h=657",
			message: "azcvcvzvx",
			is_own: false
		},
		{
			src: "https://img0.baidu.com/it/u=774820494,3487643102&fm=253&fmt=auto&app=138&f=JPEG?w=457&h=657",
			message: "zxcxzczcxzczxcxzc",
			is_own: false
		}
	])
	let input_msg = ref("")
	let scroll_top = ref(99999)
	let SendMessage = () => {
		if (input_msg.value.length > 0) {
			let item = {
				src: "https://img0.baidu.com/it/u=519070054,1937489670&fm=253&fmt=auto&app=138&f=JPG?w=500&h=707",
				message: input_msg.value,
				is_own: true
			}
			let text = input_msg.value
			input_msg.value = ""
			items.value.push(item)
			nextTick(() => {
				scroll_top.value += 1
				
			})
			
			console.log('send backend')
			uni.request({
				url:url,
				data: { text: text},
				success(res) {
					LoadData(res)
					console.log(res)
				}
			})
		}
	}
	
	let LoadData = (res) => {
		let text = ParseData(res.data)
		let item = {
			src: "https://img0.baidu.com/it/u=774820494,3487643102&fm=253&fmt=auto&app=138&f=JPEG?w=457&h=657",
			message: text,
			is_own: false
		}
		items.value.push(item)
		nextTick(() => {
			scroll_top.value += 1
			
		})
	}
	let ParseData = (res) => {
		let text = ""
		for (let i = 0; i < res.EmbellishList.length; ++i) {
			text += res.EmbellishList[i].Text
		}
		return text
	}
</script>
<style>
	.ipt {
		background-color: blue;
	}

	.scroll_view {
		width: 750rpx;
		height: 1160rpx;
		/* background-color: rgb(240, 240, 240); */
		background-image: url(https://tse4-mm.cn.bing.net/th/id/OIP-C.KHF-kMskNrcKXsh_XZYT-AHaKH?w=186&h=255&c=7&r=0&o=5&dpr=2&pid=1.7);
		background-size: 750rpx 1100rpx;
	}

	.content {
		width: 750rpx;
		height: 700rpx;
		/* background-color: seagreen; */
	}

	.leftbox {
		width: 750rpx;
		display: flex;
		justify-content: flex-start;
		flex-wrap: nowrap;
		/* background-color: silver; */
		margin-top: 30rpx;
	}

	.leftbox_img {
		width: 80rpx;
		height: 80rpx;
		border-radius: 20rpx;
		margin-left: 10rpx;
	}

	.leftbox_text {
		min-width: 200rpx;
		max-width: 600rpx;
		background-color: skyblue;
		margin-left: 10rpx;
		font-size: 30rpx;
		border-radius: 5rpx 10rpx 10rpx 5rpx;
		padding: 5rpx;
	}

	.rightbox {
		width: 750rpx;
		display: flex;
		justify-content: flex-end;
		flex-wrap: nowrap;
		/* background-color: silver; */
		margin-top: 30rpx;
	}

	.rightbox_text {
		min-width: 200rpx;
		max-width: 550rpx;
		background-color: burlywood;
		margin-right: 10rpx;
		font-size: 30rpx;
		border-radius: 10rpx 5rpx 5rpx 10rpx;
		padding: 5rpx;
	}

	.rightbox_img {
		width: 80rpx;
		height: 80rpx;
		border-radius: 20rpx;
		margin-right: 10rpx;
	}

	.bottombar {
		width: 750rpx;
		height: 90rpx;
		background-color: rgb(240, 240, 240);
		display: flex;
		justify-content: flex-start;
		flex-wrap: nowrap;
	}

	.chatinput {
		width: 600rpx;
		height: 70rpx;
		background-color: white;
		margin-top: 10rpx;
		margin-left: 10rpx;
		border-radius: 10rpx 0rpx 0rpx 10rpx;
	}

	.sendbtn {
		width: 100rpx;
		height: 66rpx;
		background-color: skyblue;
		margin-top: 12rpx;
		text-align: center;
		line-height: 66rpx;
		border-radius: 0rpx 10rpx 10rpx 0rpx;
	}
</style>