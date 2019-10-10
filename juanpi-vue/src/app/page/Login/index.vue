<template>
	<div class="page-wrapper">
		<div class="header">
			<a class="iconfont icon-back back" @click="$router.back()"></a>
			<h1 class="title">登录</h1>
			<router-link to="/register" class="register">注册</router-link>
		</div>
		<div class="login-mode">
			<span class="account" :class=" mode ? 'mode' : '' " @click="mode = true">卷皮账号登录</span>
			<span class="phone" :class=" !mode ? 'mode' : '' " @click=" mode = !mode ">手机快捷登录</span>
		</div>
		<LoginPwd v-if="mode"></LoginPwd>
		<LoginPhone v-else></LoginPhone>
		<div class="others-select clearfix">
			<img src="./images/label.png" :class="select ? 'select' : '' " @click="select = !select">
			<span>两周内免登录</span>
			<router-link to="/register">忘记密码?</router-link>
		</div>
		<div class="others-account">
			<h3 class="title">第三方账号快速登录</h3>
			<router-link to="qq.com"><img src="./images/tencent.png" ></router-link>
			<router-link to="taobao.com"><img src="./images/taobao.png" ></router-link>
			<router-link to="sina.com"><img src="./images/sina.png" ></router-link>
		</div>
		<div class="service">
			<ul>
				<li><img src="./images/unexpress.png" ><span>全场包邮</span></li>
				<li><img src="./images/search.png" ><span>100%人工质检</span></li>
				<li><img src="./images/seven.png" ><span>7天放心退</span></li>
			</ul>
		</div>
	</div>

</template>

<script type="text/ecmascript-6">
	import LoginPhone from './LoginPhone';
	import LoginPwd from './LoginPwd';

	export default {
	        components: { LoginPhone, LoginPwd },
		data: function() {
	                return {
	                        mode: true,                                     //登录模式切换，默认为手机登录
		                select: false,                                  //标识 两周内免登录 是否选中， 默认为 false
	                }
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		text-align: center
		*
			color: white
			box-sizing: border-box
			padding: 0 0.2rem
		.header
			display: flex
			width: 100%
			height: 0.8rem
			line-height: 0.8rem
			background: linear-gradient(150deg,#ff5a61 50%,#fd631c)
			a.back,
			a.register
				flex-shrink: 0
				outline: none
				font-size: 0.3rem
			h1.title
				flex-grow: 1
				font-weight: normal
				font-size: 0.36rem
		.login-mode
			padding: 0.2rem 0
			span
				display: inline-block
				font-size: 0.26rem
				color: #999
				padding-bottom: 0.1rem
				border-bottom: 3px solid transparent
				&.mode
					color: #ff464e
					border-bottom: 3px solid #ff464e
		.others-select
			text-align: left
			*
				color: black
			img
				background-color: #ff464e
				border: 1px solid transparent
				padding: 0
				&.select
					background-color: #fff
					border: 1px solid black
			a
				float: right

		.others-account
			text-align: center
			padding: 1rem 0 0.5rem
			h3.title
				font-weight: normal
				color: #999
				padding: 0.4rem 0 0.5rem
			a
				img
					margin: 0 0.2rem
		.service
			padding: 0.2rem 0
			border-top: 1px solid #ccc
			*
				padding: 0
			ul
				display: flex
				li
					display: flex
					align-items: center
					justify-content: center
					flex-grow: 1
					flex-basis: 0
					img
						margin-right: 0.1rem
					span
						color: #999
</style>