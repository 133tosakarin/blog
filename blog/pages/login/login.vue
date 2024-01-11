<template>
	<view class="container">
		<view class="login-header">
			<!-- <text class="title">frash news blog登录</text> -->
		</view>
		<!-- 网页中间logo -->
		<view class="form">
			<view class="main_logo">
				<view class="logo">
					<image src="/static/pagelogo.png"></image>
				</view>
			</view>

			<input type="text" class="input-field" placeholder="手机号/邮箱/用户名" v-model="username" />
			<input type="password" class="input-field" placeholder="密码" v-model="password" />
			<button class="login-button" @click="login">登录</button>
			<navigator url="/pages/register/register"><button class="login-register" @click="register">
					没有账号，立即注册
				</button>
			</navigator>
		</view>
	</view>
</template>

<script setup>
let username = ''
let password = ''
let login = () => {
    // 检查用户名和密码是否为空
    if (!username.trim() || !password.trim()) {
        uni.showToast({
            title: '用户名或密码不能为空',
            icon: 'none',
            duration: 2000
        });
        return; // 终止函数执行
    }

    let login_let = {
        username: username,
        password: password,
    }
    console.log(login_let)
    uni.request({
        url: "http://172.22.9.9:7001/login",
        data: login_let,
        success(res) {
            console.log(res.data)
            // 检查后端返回的指令
            if (res.data && res.data.success) {
                // 登录成功，跳转到index.vue页面
                uni.navigateTo({
                    url: '/pages/index/index'
                });
            } else if (res.data && res.data.message === 'username or password error!') {
                // 用户名或密码错误
                uni.showToast({
                    title: '用户名或密码错误',
                    icon: 'none',
                    duration: 2000
                });
            } else {
                // 其他登录失败情况
                uni.showToast({
                    title: '登录失败',
                    icon: 'none',
                    duration: 2000
                });
            }
        },
        fail(err) {
            // 请求失败，弹出提示框
            uni.showToast({
                title: '请求失败',
                icon: 'none',
                duration: 2000
            });
            console.log('请求失败', err);
        }
    })
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

	.login-button {
		width: 700rpx;
		padding: 15rpx;
		background-color: rgb(254, 142, 8);
		border: none;
		border-radius: 4rpx;
		color: white;
		font-size: 24rpx;
		border-radius: 45rpx;
		margin-top: 40rpx;
		margin-right: 45rpx;
	}

	.login-register {
		width: 700rpx;
		padding: 15rpx;
		background-color: rgb(254, 142, 8);
		border: none;
		border-radius: 4rpx;
		color: white;
		font-size: 24rpx;
		margin-top: 20rpx;
		border-radius: 45rpx;
		margin-right: 45rpx;
	}
</style>