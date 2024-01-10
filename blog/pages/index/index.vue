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
				<view class="item_content" :id="el.content_id">
					<navigator url="/pages/content_detail/content_detail">
						<view @click="load_detail(el)">
							<text class="item_text">{{el.item_text}}</text>
						</view>
					</navigator>
					<view class="buttom_tools">
						<image :id="'like_img_'+el.content_id" class="tool_img" :src="el.like_img" mode="" @click="func_like($event.target)">
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
					<navigator url="/pages/content_detail/content_detail">
						<view @click="load_detail(el)">
							<text class="item_text">{{el.item_text}}</text>
							<view class="content_imgs">
								<view v-for="item in el.item_imgs">
									<image class="content_imgs_style" :src="item" mode="aspectFill"></image>
								</view>
							</view>
						</view>
					</navigator>
					<view class="buttom_tools">
						<image :id="'like_img_'+el.content_id" class="tool_img" :src="el.like_img" mode="" @click="func_like($event.target)">
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
					<navigator url="/pages/content_detail/content_detail">
						<view @click="load_detail(el)">
							<text class="item_text">{{el.item_text}}</text>
							<video :enable-play-gesture="true" :title="el.item_text" :show-mute-btn="true"
								object-fit="cover" class="item_video" :src="el.item_video" controls></video>
						</view>
					</navigator>
					<view class="buttom_tools">
						<image :id="'like_img_'+el.content_id" class="tool_img" :src="el.like_img" mode="" @click="func_like($event.target)">
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
	const connect_url = "http://172.23.64.94:7001/"
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
					like_img: '/static/点赞.png',
					is_like:false
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
			

		},
		fail() {
			// 如果items_content为空，就往里面填入假数据，以便开发
			if (items_content.value.length == 0) {
				items_content.value.push({
					content_id: 1,
					type: 2, //1--纯文本 2--图片 3--视频
					character_img: "https://img1.baidu.com/it/u=2139451249,2432292307&fm=253&fmt=auto&app=138&f=JPEG?w=553&h=500",
					character_name: "IKun永相随",
					send_time: "2077/12/31 23:59:59",
					item_text: "真的很抱歉哦，数据获取失败了~",
					item_imgs: [
						'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fa1a6b1bc-c317-4a6a-8bb3-28a3c29b8369%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1707455205&t=11084879c8738b84685d080135dc0e99'
					],
					item_video: '',
					like_count: 50,
					comment_count: 50,
					is_like:false,
				})
			}
		}
		
	})
	items_content.value.shift()
	console.log("items_content.value:", items_content.value)
	
	let refreshPage = () => {
		uni.reLaunch({
			url: '/pages/index/index'
		})
	}
	let load_detail = (content) => {
		console.log(content)
		uni.setStorageSync("info", JSON.stringify(content))
	}
	let func_like=(element)=>{
		for(let i = 0; i<items_content.value.length; i++){
			if("like_img_"+items_content.value[i].content_id==element.id &&items_content.value[i] && !items_content.value[i].is_like){
				uni.request({
					url:connect_url+'like',
					data:{content_id:items_content.value[i].content_id},
					success(res) {
						console.log("点赞成功")
						items_content.value[i].like_count++
						items_content.value[i].is_like=true
						items_content.value[i].like_img="/static/点赞1.png"
					}
				})
			}
		}
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
		margin-top: 5rpx;
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
	.like_active{
		width: 45rpx;
		height: 45rpx;
		margin: 0rpx 0rpx 10rpx 10rpx;
		background-image: "/static/点赞1.png";
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