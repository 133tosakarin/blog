<template id="page_top">

	<view>
		<view class="character_introduction">
			<image class="head_img" :src="data.character_img" mode=""></image>
			<view class="middle_introduction">
				<text class="character_name">{{data.character_name}}\n</text>
				<text class="send_time">{{data.send_time}}</text>
			</view>
			<text class="follow_like">+ 关注</text>
		</view>
		<!-- 文本内容 -->
		<view class="text_detail" @click="reveal_all_text" :style="'-webkit-line-clamp: '+reveal_lines">
			{{data.item_text}}
		</view>
		<!-- 图片内容 -->
		<view v-for="el in data.item_imgs" v-if="data.type==2">
			<view class="img_container">
				<image :src="el" mode=""></image>
			</view>
		</view>
		<!-- 视频内容 -->
		<view v-if="data.type==3">
			<video :src="data.item_video" controls></video>
		</view>
		<!-- 评论区 -->
		<view id="comment_area">
			<view class="comment_title">
				<text class="comment_title_text">评论 共{{data.comment_count}}条</text>

			</view>
			<!-- 上传评论区 -->
			<view class="comment_tool_view">
				<input type="text" class="input_comment" :placeholder="send_attention" v-model="send_content"
					@input="reveal_input" />
				<view class="send_comment" @click="send_comment">评论</view>
			</view>
			<!-- 评论具体内容区 -->
			<view class="comment_text_view">
				<!-- 通过循环显示多条评论 -->
				<view v-for="comment in get_comments">
					<view class="comment_content">
						<image :src="comment.user_img" mode=""></image>
						<view class="name_and_content">
							<text class="content_name">{{comment.user_name}}\n</text>
							<text class="content_text">{{comment.comment_text}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	<!-- 跳转到评论区 -->
	<view class="target_comment_area" @click="func_to_comment">
		<image class="to_comment_img" src="/static/向下.png" mode=""></image>
	</view>
</template>

<script setup>
	let connection_url = "http://172.22.9.9:7001/"
	import {
		ref
	} from 'vue'
	let reveal_lines = ref('5')
	let send_attention = ref("万水千山总是情,给个评论行不行~")
	let get_comments = ref({}) //要显示到前端的评论内容
	let send_content = ref('') //要发送的评论
	let str_data = uni.getStorageSync("info")
	let data = ref(JSON.parse(str_data))

	uni.request({
		url: connection_url + "comment",
		data: {
			content_id: data.value.content_id
		},
		success(res) {
			console.log("获取的评论信息：", res.data)
			get_comments.value = res.data
		},
		fail() {
			console.log("连接失败")
		}
	})
	// 先请求获取评论数据

	console.log("获取的评论信息：", get_comments)
	uni.removeStorageSync("info")
	let reveal_all_text = (event) => {
		reveal_lines.value = '999'
	}
	console.log("send_content: ", send_content.value)
	let send_comment = () => {
		uni.request({
			url: connection_url + "add_comment",
			method: "POST",
			data: {
				content_id: data.value.content_id,
				comment_text: send_content.value
			},
			success(res) {
				send_attention.value = "评论成功"
				send_content.value = ''
				uni.request({
					url: connection_url + "comment",
					data: {
						content_id: data.value.content_id
					},
					success(res) {
						console.log("获取的评论信息：", res.data)
						get_comments.value = res.data
					},
					fail() {
						console.log("连接失败")
					}
				})
			},
			fail() {
				console.log("评论失败")
				send_attention.value = "评论失败"
			}
		})
	}
	let func_to_comment = () => {
		const comment_area = document.getElementById("comment_area")
		window.scrollTo({
			top: comment_area.offsetTop,
			behavior: "smooth"
		})
	}
	window.scrollTo({
		top: document.getElementById("page_top")
	})
</script>

<style>
	.character_introduction {
		width: 750rpx;
		height: 70rpx;
		margin-top: 10rpx;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.head_img {
		border-radius: 50%;
		width: 70rpx;
		height: 70rpx;
		margin-left: 10rpx;
	}

	.middle_introduction {
		line-height: 30rpx;
		margin-left: 10rpx;
		margin-top: 5rpx;
		width: 510rpx;
		font-family: "黑体";
	}

	.character_name {
		font-size: 26rpx;
	}

	.send_time {
		font-size: 22rpx;
	}

	.follow_like {
		width: 120rpx;
		height: 50rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
		margin-top: 10rpx;
		line-height: 50rpx;
		text-align: center;
		font-size: 26rpx;
		border-radius: 40rpx;
		border: 1px rgb(255, 144, 24) solid;
		color: rgb(255, 144, 24);
	}

	.text_detail {
		margin: 15rpx 15rpx 15rpx 20rpx;
		line-height: 40rpx;
		font-size: 29rpx;
		display: -webkit-box;
		-webkit-line-clamp: auto;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.img_container {
		height: 600rpx;
		overflow: hidden;
	}

	.img_container image {
		height: 600rpx;
		margin: 10rpx 10rpx 0rpx 40rpx;
		border-radius: 5rpx;
	}

	video {
		width: 94%;
		margin-left: 3%;
		height: 0;
		padding-bottom: 56.25%;
		object-fit: contain;
	}

	.comment_title {
		width: 750rpx;
		height: 60rpx;
		background-color: rgb(248, 248, 248);
		margin-top: 20rpx;
		border-top: 1px rgb(220, 220, 220) solid;
		border-bottom: 1px rgb(220, 220, 220) solid;
	}

	.comment_title_text {
		line-height: 60rpx;
		margin-left: 20rpx;
		font-size: 26rpx;
		color: rgb(100, 100, 100);
		font-family: '黑体';
	}

	.comment_text_view {
		width: 750rpx;
		background-color: rgb(248, 248, 248);
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.comment_content {
		width: 750rpx;
		background-color: rgb(248, 248, 248);
		border-top: 1px rgb(220, 220, 220) solid;
		border-bottom: 1px rgb(220, 220, 220) solid;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.comment_content image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
		margin-left: 10rpx;
		margin-top: 15rpx;
	}

	.name_and_content {
		width: 620rpx;
		margin-left: 10rpx;
		margin-top: 5rpx;
		margin-bottom: 10rpx;
	}

	.content_name {
		font-size: 24rpx;
		font-family: '黑体';
		color: rgb(100, 100, 100);
	}

	.content_text {
		font-size: 28rpx;
		line-height: 26rpx;
	}

	.comment_tool_view {
		width: 750rpx;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.input_comment {
		width: 630rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 10rpx;
		margin-left: 5rpx;
		border: 1rpx rgb(150, 150, 150) solid;
	}

	.send_comment {
		width: 105rpx;
		height: 60rpx;
		background-color: rgb(255, 144, 24);
		margin-left: 3rpx;
		border-radius: 5rpx;
		line-height: 60rpx;
		text-align: center;
		color: white;
	}

	.target_comment_area {
		width: 70rpx;
		height: 70rpx;
		background-color: rgb(230, 230, 230);
		border: 1px rgb(200, 200, 200) solid;
		opacity: 0.9;
		border-radius: 20rpx;
		position: fixed;
		top: 75%;
		left: 670rpx;
	}

	.to_comment_img {
		width: 50rpx;
		height: 50rpx;
		margin: 10rpx;
		margin-top: 5rpx;
	}
</style>