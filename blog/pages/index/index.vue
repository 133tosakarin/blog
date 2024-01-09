<template>
	<view>
		<view class="index_items_parent" v-for="el in items_content">
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
					<video :enable-play-gesture="true" :title="el.item_text" :show-mute-btn="true" object-fit="cover" class="item_video" :src="el.item_video" controls></video>
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
					<image class="head_img"
						src="https://img1.baidu.com/it/u=2139451249,2432292307&fm=253&fmt=auto&app=138&f=JPEG?w=553&h=500"
						mode=""></image>
					<view class="middle_introduction">
						<text class="character_name">爱坤家族\n</text>
						<text class="send_time">2023-10-11 20:16</text>
					</view>
					<text class="follow_like">+ 关注</text>
				</view>
				<view class="item_content">
					<text class="item_text">儿媳生女儿被赶走,谁知离婚现场换尿片，一看是个带把的!快来围观！怎么会是这个样子，快来看看吧！最新新闻！热门新闻！</text>
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
		</view>
		<view class="refresh_button">
			<image class="refresh_img" src="/static/刷新.png" mode="" @click="refreshPage"></image>
		</view>
	</view>
</template>

<script setup>
	let refreshPage = ()=>{
		uni.reLaunch({
			url:'/pages/index/index'
		})
	}
	let items_content = [
		{
			content_id: "A001",
			type: 2, //1--纯文本 2--图片 3--视频
			character_img: "https://img1.baidu.com/it/u=2139451249,2432292307&fm=253&fmt=auto&app=138&f=JPEG?w=553&h=500",
			character_name: "爱坤家族",
			send_time: "2023-10-11 20:16",
			item_text: "儿媳生女儿被赶走,谁知离婚现场换尿片，一看是个带把的!快来围观！怎么会是这个样子，快来看看吧！最新新闻！热门新闻！",
			item_imgs: [
				"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F7b031480-3e80-48a4-b53c-9f0edaf4744c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1707301244&t=4dabaa884a7962543d18d73a9a70481c",
				"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F7b031480-3e80-48a4-b53c-9f0edaf4744c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1707301244&t=4dabaa884a7962543d18d73a9a70481c",
				"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F7b031480-3e80-48a4-b53c-9f0edaf4744c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1707301244&t=4dabaa884a7962543d18d73a9a70481c",
				"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F7b031480-3e80-48a4-b53c-9f0edaf4744c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1707301244&t=4dabaa884a7962543d18d73a9a70481c",
				"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F7b031480-3e80-48a4-b53c-9f0edaf4744c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1707301244&t=4dabaa884a7962543d18d73a9a70481c",
				"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F7b031480-3e80-48a4-b53c-9f0edaf4744c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1707301244&t=4dabaa884a7962543d18d73a9a70481c"
			],
			item_video: "",
			like_count: 105,
			comment_count: 44,
		},
		{
			content_id: "A001",
			type: 3, //1--纯文本 2--图片 3--视频
			character_img: "https://img1.baidu.com/it/u=2139451249,2432292307&fm=253&fmt=auto&app=138&f=JPEG?w=553&h=500",
			character_name: "爱坤家族",
			send_time: "2023-10-11 20:16",
			item_text: "儿媳生女儿被赶走,谁知离婚现场换尿片，一看是个带把的!快来围观！怎么会是这个样子，快来看看吧！最新新闻！热门新闻！",
			item_imgs: [],
			item_video: "http://172.23.167.18:7001/public/video/video1.mp4",
			like_count: 203,
			comment_count: 38,
		},
		{
			content_id: "A001",
			type: 2, //1--纯文本 2--图片 3--视频
			character_img: "https://img1.baidu.com/it/u=2139451249,2432292307&fm=253&fmt=auto&app=138&f=JPEG?w=553&h=500",
			character_name: "爱坤家族",
			send_time: "2023-10-11 20:16",
			item_text: "儿媳生女儿被赶走,谁知离婚现场换尿片，一看是个带把的!快来围观！怎么会是这个样子，快来看看吧！最新新闻！热门新闻！",
			item_imgs: [
				"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F7b031480-3e80-48a4-b53c-9f0edaf4744c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1707301244&t=4dabaa884a7962543d18d73a9a70481c",
				"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F7b031480-3e80-48a4-b53c-9f0edaf4744c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1707301244&t=4dabaa884a7962543d18d73a9a70481c",
				"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F7b031480-3e80-48a4-b53c-9f0edaf4744c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1707301244&t=4dabaa884a7962543d18d73a9a70481c",
				"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F7b031480-3e80-48a4-b53c-9f0edaf4744c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1707301244&t=4dabaa884a7962543d18d73a9a70481c",
				"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F7b031480-3e80-48a4-b53c-9f0edaf4744c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1707301244&t=4dabaa884a7962543d18d73a9a70481c",
				"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F7b031480-3e80-48a4-b53c-9f0edaf4744c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1707301244&t=4dabaa884a7962543d18d73a9a70481c"
			],
			item_video: "",
			like_count: 105,
			comment_count: 44,
		},
		{
			content_id: "A002",
			type: 1, //1--纯文本 2--图片 3--视频
			character_img: "https://img1.baidu.com/it/u=2139451249,2432292307&fm=253&fmt=auto&app=138&f=JPEG?w=553&h=500",
			character_name: "爱坤家族",
			send_time: "2023-10-11 20:16",
			item_text: "儿媳生女儿被赶走,谁知离婚现场换尿片，一看是个带把的!快来围观！",
			item_imgs: [],
			item_video: "",
			like_count: 45,
			comment_count: 7,
		},
		{
			content_id: "A003",
			type: 1, //1--纯文本 2--图片 3--视频
			character_img: "https://img1.baidu.com/it/u=2139451249,2432292307&fm=253&fmt=auto&app=138&f=JPEG?w=553&h=500",
			character_name: "爱坤家族",
			send_time: "2023-10-11 20:16",
			item_text: "儿媳生女儿被赶走,谁知离婚现场换尿片，一看是个带把的!快来围观！",
			item_imgs: [],
			item_video: "",
			like_count: 45,
			comment_count: 7,
		},
		{
			content_id: "A004",
			type: 2, //1--纯文本 2--图片 3--视频
			character_img: "https://img1.baidu.com/it/u=2139451249,2432292307&fm=253&fmt=auto&app=138&f=JPEG?w=553&h=500",
			character_name: "爱坤家族",
			send_time: "2023-10-11 20:16",
			item_text: "儿媳生女儿被赶走,谁知离婚现场换尿片，一看是个带把的!快来围观！怎么会是这个样子，快来看看吧！最新新闻！热门新闻！",
			item_imgs: [
				"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F7b031480-3e80-48a4-b53c-9f0edaf4744c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1707301244&t=4dabaa884a7962543d18d73a9a70481c",
				"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F7b031480-3e80-48a4-b53c-9f0edaf4744c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1707301244&t=4dabaa884a7962543d18d73a9a70481c",
				"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F7b031480-3e80-48a4-b53c-9f0edaf4744c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1707301244&t=4dabaa884a7962543d18d73a9a70481c",
				"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F7b031480-3e80-48a4-b53c-9f0edaf4744c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1707301244&t=4dabaa884a7962543d18d73a9a70481c",
				"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F7b031480-3e80-48a4-b53c-9f0edaf4744c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1707301244&t=4dabaa884a7962543d18d73a9a70481c",
				"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F7b031480-3e80-48a4-b53c-9f0edaf4744c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1707301244&t=4dabaa884a7962543d18d73a9a70481c"
			],
			item_video: "",
			like_count: 105,
			comment_count: 44,
		},
		{
			content_id: "A005",
			type: 1, //1--纯文本 2--图片 3--视频
			character_img: "https://img1.baidu.com/it/u=2139451249,2432292307&fm=253&fmt=auto&app=138&f=JPEG?w=553&h=500",
			character_name: "爱坤家族",
			send_time: "2023-10-11 20:16",
			item_text: "儿媳生女儿被赶走,谁知离婚现场换尿片，一看是个带把的!快来围观！",
			item_imgs: [],
			item_video: "",
			like_count: 45,
			comment_count: 7,
		}
	]
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
		-webkit-line-clamp: 2;
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