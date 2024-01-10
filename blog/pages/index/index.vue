<template>
	<view>
		<view class="index_items_parent" v-for="el in items_content">

			<!-- 帖子内容（仅文本） -->
			<view class="index_items" v-if="el.type==1">
				<!-- 人物介绍 -->
				<view class="character_introduction">
					<image class="head_img" :src="el.character_img" mode=""></image>
					<view class="middle_introduction">
						<text class="character_name">{{el.character_name}}\n</text>
						<text class="send_time">{{el.send_time}}</text>
					</view>
					<text class="follow_like">+ 关注</text>
				</view>
				<view class="item_content">
					<text class="item_text">{{el.item_text}}</text>
					<view class="buttom_tools">
						<image class="tool_img" src="/static/点赞.png" mode="">
						</image>
						<text class="count_text">{{el.like_count}}</text>
						<image class="tool_img" src="/static/评论.png" mode="">
						</image>
						<text class="count_text">{{el.comment_count}}</text>
					</view>
				</view>
			</view>
			<!-- 帖子内容（图片） -->
			<view class="index_items" v-if="el.type==2">
				<!-- 人物介绍 -->
				<view class="character_introduction">
					<image class="head_img" :src="el.character_img" mode=""></image>
					<view class="middle_introduction">
						<text class="character_name">{{el.character_name}}\n</text>
						<text class="send_time">{{el.send_time}}</text>
					</view>
					<text class="follow_like">+ 关注</text>
				</view>
				<view class="item_content">
					<text class="item_text">{{el.item_text}}</text>
					<view class="content_imgs">
						<view v-for="item in el.item_imgs">
							<image class="content_imgs_style" :src="item" mode=""></image>
						</view>
					</view>
					<view class="buttom_tools">
						<image class="tool_img" src="/static/点赞.png" mode="">
						</image>
						<text class="count_text">{{el.like_count}}</text>
						<image class="tool_img" src="/static/评论.png" mode="">
						</image>
						<text class="count_text">{{el.comment_count}}</text>
					</view>
				</view>
			</view>
			<!-- 帖子内容（视频） -->
			<view class="index_items" v-if="el.type==3">
				<!-- 人物介绍 -->
				<view class="character_introduction">
					<image class="head_img" :src="el.character_img" mode=""></image>
					<view class="middle_introduction">
						<text class="character_name">{{el.character_name}}\n</text>
						<text class="send_time">{{el.send_time}}</text>
					</view>
					<text class="follow_like">+ 关注</text>
				</view>
				<view class="item_content">
					<text class="item_text">{{el.item_text}}</text>
					<video :enable-play-gesture="true" :title="el.item_text" :show-mute-btn="true" object-fit="cover"
						class="item_video" :src="el.item_video" controls></video>
					<view class="buttom_tools">
						<image class="tool_img" src="/static/点赞.png" mode="">
						</image>
						<text class="count_text">{{el.like_count}}</text>
						<image class="tool_img" src="/static/评论.png" mode="">
						</image>
						<text class="count_text">{{el.comment_count}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="refresh_button">
			<image class="refresh_img" src="/static/刷新.png" mode="" @click="refreshPage"></image>
		</view>
	</view>
</template>

<script setup>
	const connect_url = "http://localhost:7001"
	import {
		ref
	} from 'vue'
	let items_content = ref([{}])
	uni.request({
		url: connect_url,
		success(res) {
			for (let i = 0; i < res.data.length; i++) {
				let current_content = res.data[i]
				let temp_content = {
					content_id: current_content.content_id,
					type: current_content.type, //1--纯文本 2--图片 3--视频
					character_img: current_content.user_img,
					character_name: current_content.user_name,
					send_time: current_content.create_time,
					item_text: current_content.content_text,
					item_imgs: current_content.imgs,
					item_video: current_content.video,
					like_count: current_content.like_count,
					comment_count: current_content.comment_count,
				}
				let real_imgs = ['']
				let deal_img = ''
				let flag = true //true当前deai_img无数据  false有数据
				for (let j = 0; j < temp_content.item_imgs.length; j++) {
					//deal_img无数据
					if (flag == true) {
						deal_img = temp_content.item_imgs[j]
						flag = false
					}
					//deal_img有数据
					else if (flag == false) {
						if (temp_content.item_imgs[j].startsWith("http")) {
							real_imgs.push(deal_img)
							deal_img = temp_content.item_imgs[j]
						} else {
							deal_img = deal_img + ',' + temp_content.item_imgs[j]
						}
					}
				}
				real_imgs.push(deal_img)
				real_imgs.shift()
				temp_content.item_imgs = real_imgs
				items_content.value.push(temp_content)
			}

		}
	})
	items_content.value.shift()
	console.log("items_content:", items_content.value)


	let refreshPage = () => {
		uni.reLaunch({
			url: '/pages/index/index'
		})
	}
</script>

<style>
	.index_items_parent {
		width: 750rpx;
		background-color: rgb(238, 238, 238);
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.index_items {
		width: 750rpx;
		background-color: white;
		margin-top: 15rpx;
		border-radius: 15rpx;
		border: 1px rgb(238, 238, 238) solid;
		border-left-width: 0px;
		border-right-width: 0px;
	}

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

	.item_content {
		width: 730rpx;
		margin: 15rpx 10rpx 0rpx 10rpx;
	}

	.item_text {
		width: 730rpx;
		line-height: 45rpx;
		font-size: 28rpx;
		display: -webkit-box;
		-webkit-line-clamp: 5;
		-webkit-box-orient: vertical;
		overflow: hidden;
		font-family: "黑体";
	}

	.item_video {
		width: 700rpx;
		height: 380rpx;
		margin-left: 15rpx;
	}

	.buttom_tools {
		width: 750rpx;
		height: 60rpx;
		margin-top: 5rpx;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.tool_img {
		width: 45rpx;
		height: 45rpx;
		margin: 0rpx 0rpx 10rpx 10rpx;
	}

	.content_imgs {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		max-height: 480rpx;
	}

	.content_imgs_style {
		width: 232rpx;
		height: 232rpx;
		margin: 0rpx 0rpx 0rpx 10rpx;
		border-radius: 7rpx;
	}

	.refresh_button {
		width: 70rpx;
		height: 70rpx;
		background-color: rgb(238, 238, 238);
		border-radius: 15rpx;
		border: 1px rgb(220, 220, 220) solid;
		position: fixed;
		top: 80%;
		left: 650rpx;
		opacity: 0.8;
	}

	.refresh_img {
		width: 65rpx;
		height: 65rpx;
		margin: 4rpx;
	}

	.count_text {
		margin-right: 50rpx;
		margin-left: 10rpx;
		color: rgb(140, 140, 140);
	}
</style>