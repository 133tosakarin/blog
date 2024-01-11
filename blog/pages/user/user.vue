<template>
	<view class="container">

		<view class="profile-section">
			<!-- 用户信息区域 -->
			<view class="avatar">
				<image src="../../static/avatar.jpg" class="avatar-img"></image>
			</view>
			<view class="user-info">
				<text class="username">未登录</text>
				<text class="description">简介: 这里是个人简介</text>
			</view>
		</view>
		<!-- 顶部个人信息-->
		<view class="topbar">
			<view class="myblog">
				<text>我的帖子</text>
				<text>0</text>
			</view>
			<view class="my_interest">
				<text>我的关注</text>
				<text>0</text>
			</view>
			<view class="fans">
				<text>粉丝</text>
				<text>0</text>
			</view>
		</view>
		<!-- 中部我的信息 -->
		<view class="middleview">
			<swiper :indicator-dots="false" indicator-active-color="rgb(250,44,25)" class="middleswiper">
				<!-- 第一排 -->
				<swiper-item>
					<view class="middleflexparent">
						<navigator url="/pages/home/aichat/aichat">
							<view class="middleitem">
								<image src="../../static/相册.png" mode=""></image>
								我的相册
							</view>
						</navigator>

						<view class="middleitem">
							<image src="../../static/赞.png" mode=""></image>
							赞/收藏
						</view>
						<view class="middleitem">
							<image src="../../static/016_浏览记录.png" mode=""></image>
							浏览记录
						</view>
						<view class="middleitem">
							<image src="../../static/访问.png" mode=""></image>
							经常访问
						</view>
						<view class="middleitem">
							<image src="../../static/草稿箱.png" mode="">
								<web-view src="http://172.22.10.165"></web-view>
							</image>
							草稿箱
						</view>
						<view class="middleflexparent">
							<view class="middleitem">
								<image src="../../static/我的钱包.png" mode=""></image>
								我的钱包
							</view>
							<view class="middleitem">
								<image src="../../static/我的订单.png" mode=""></image>
								我的订单
							</view>
							<view class="middleitem">
								<image src="../../static/创作.png" mode=""></image>
								创作中心
							</view>
							<view class="middleitem">
								<image src="../../static/访客足迹.png" mode=""></image>
								主页访客
							</view>
							<view class="middleitem">
								<image src="../../static/广告.png" mode=""></image>
								广告中心
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 底部bar -->
		<view class="bottom">
			<view class="advertisment">
				<image class="bottom_img" src="../../static/招聘.png" mode=""></image>
				<text class="bottom_text">广告招商</text>
			</view>
			<view class="contact_us ">
				<image class="bottom_img" src="../../static/投诉建议.png" mode=""></image>
				<text class="bottom_text">投诉建议</text>
			</view>
			<view class="tuijie">
				<image class="bottom_img" src="../../static/推荐.png" mode=""></image>
				<text class="bottom_text">推荐我们</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	try{
		if(uni.getStorageSync("isLogin")!="true"){
			console.log("未登录")
			uni.navigateTo({
				url:"/pages/login/login"
			})
		}
	}
	catch(e){
		
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		width: 750rpx;
		height:1150rpx;
		background: url(../../userbackground.jpg) repeat fixed center;
		
	}

	.profile-section {
		display: flex;
		padding: 20px;
		background-color: gold;
		background: url(../../userbackground.jpg) repeat fixed center;
		border-radius: 10rpx  10rpx 10rpx 10rpx;
	}

	.avatar {
		margin-right: 20px;
	}

	.avatar-img {
		width: 80px;
		height: 80px;
		border-radius: 40px;
	}

	.user-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.username {
		font-size: 18px;
		font-weight: bold;
	}

	.description {
		font-size: 14px;
		color: #666;
	}

	.topbar {
		/* display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center; */
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		height: 100rpx;
		/* background-color: rgb(202,232,234); */
	}

	.myblog {
		width: 250rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.myblog text {
		margin: 5rpx 0;
	}

	.my_interest {
		width: 250rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.fans {
		width: 250rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.middleview {
		width: 750rpx;
		height: 200rpx;
		margin-top: 10%;
	}

	.middleswiper {
		width: 750rpx;
		height: 320rpx;
	}

	.middleflexparent {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.middleitem {
		width: 150rpx;
		height: 150rpx;
		font-size: 24rpx;
		text-align: center;
	}

	.middleitem image {
		width: 85rpx;
		height: 85rpx;
		margin: 4rpx 32.5rpx;
	}

	.bottom {

		width: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		margin-top: 150rpx;

	}

	.advertisment {
		display: flex;
		/* flex-direction: column; */
		align-items: flex-start;
		/* justify-content: center; */
		width: 95%;
		margin-left: 20rpx;
		line-height: 80rpx;
		height: 80rpx;
		/* background-color: rgb(250, 250, 250); */
	}

	.contact_us {
		display: flex;
		/* flex-direction: column; */
		align-items: flex-start;
		/* justify-content: center; */
		width: 95%;
		margin-left: 20rpx;
		height: 80rpx;
	/* 	background-color: rgb(250, 250, 250); */
		margin-top: 20rpx;
	}

	.tuijie {
		display: flex;
		/* flex-direction: column; */
		align-items: flex-start;
		/* justify-content: center; */
		width: 95%;
		margin-left: 20rpx;
		height: 80rpx;
/* 		background-color: rgb(250, 250, 250); */
		margin-top: 20rpx;
	}

	.bottom_img {
		width: 80rpx;
		height: 80rpx;
		margin-left: 15rpx;
	}

	.bottom_text {
		height: 80rpx;
		line-height: 80rpx;
		/* background-color: firebrick; */
		margin-left: 20rpx;
	}
</style>