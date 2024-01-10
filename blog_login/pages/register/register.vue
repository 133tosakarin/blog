<template>
	<view class="container">
		<view class="register-header">
			<!-- 	<text class="title">frash news blog注册</text> -->
		</view>
		<!-- 网页中间logo -->
		<view class="form">
			<view class="main_logo">
				<view class="logo">
					<image src="../../static/pagelogo.png"></image>
				</view>
			</view>

			<input type="text" class="input-field" placeholder="用户名" v-model="username" />
			<input type="password" class="input-field" placeholder="密码" v-model="password" />
			<input type="password" class="input-field" placeholder="确认密码" v-model="confirmPassword" />
			<button class="register-button" @click="register">注册</button>
		</view>
	</view>
</template>

<script setup>
	let username = '';
	let password = '';
	let confirmPassword = '';
	let register = () => {
		let register_let = {
			username: username,
			password: password,
			confirmPassword: confirmPassword,
		};
		console.log(register_let);
		uni.request({
			url: "http://172.22.9.9:7001/register",
			data: register_let,
			success(res) {
				console.log(res.data);
				// 判断后端返回的数据是否表示注册成功
				if (res.data.success) {
					// 注册成功，弹出提示框
					uni.showToast({
						title: '注册成功，正在跳转登录界面',
						icon: 'success',
						duration: 2000
					});

					// 设置延时后跳转到登录界面
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/login/login' // 更新为您的登录页面路径
						});
					}, 2000); // 延时2秒后跳转
				} else {
					// 注册失败的情况，弹出提示框
					uni.showToast({
						title: '注册失败，请重新注册',
						icon: 'none',
						duration: 3000
					});
				}
			}
		});
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		padding: 20rpx;
		background-color: rgb(255, 255, 255);
	}

	.main_logo {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.login-header {
		margin-bottom: 40rpx;
	}

	.title {
		font-size: 28rpx;
		color: #fa7b00;
	}

	.form {
		width: 100%;
	}

	.input-field {
		width: 680rpx;
		padding: 15rpx;
		margin-bottom: 20rpx;
		border: 1rpx solid #ddd;
		border-radius: 45rpx;
		margin-top: 40rpx;
	}

	.register-button {
		width: 700rpx;
		padding: 15rpx;
		background-color: rgb(254, 142, 8);
		border: none;
		border-radius: 45rpx;
		color: white;
		font-size: 24rpx;
		margin-top: 40rpx;
		margin-right: 45rpx;
	}
</style>