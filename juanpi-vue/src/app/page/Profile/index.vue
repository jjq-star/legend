<template>
	<div class="page-wrapper">
		<div class="header">
			<div class="header-top">
				<a href="#" onclick="history.back()" class="back iconfont icon-back"></a>
				<h1 class="title">个人中心</h1>
				<button class="btn-edit" :class="account === '' ? 'visible' : ''" @click="backLogin">退出</button>
			</div>
			<div class="header-bottom " v-if="account !== ''">
				<img src="./images/default.jpg" alt="">
				<div class="user" >
					<p>jp_<span class="phone">{{ account }}</span></p>
					<span>我的账户</span>
				</div>
			</div>
			<div class="header-bottom no-user" v-else>
				<router-link to="/register" class="register">注册</router-link>
				<router-link to="/login" class="login">登录</router-link>
			</div>
		</div>
		<div class="order">
			<div class="order-top">
				<span class="personal-order">我的订单</span>
				<span class="all-order">全部订单</span>
			</div>
			<div class="order-bottom">
				<ul>
					<li>
						<a href="#">
							<i class="iconfont icon-obligation"></i>
							<span>待付款</span>
						</a>
					</li>
					<li>
						<a href="#">
							<i class="iconfont icon-group"></i>
							<span>待成团</span>
						</a>
					</li>
					<li>
						<a href="#">
							<i class="iconfont icon-shipped"></i>
							<span>待收货</span>
						</a>
					</li>
					<li>
						<a href="#">
							<i class="iconfont icon-drawback"></i>
							<span>退款/售后</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="content">
			<ul>
				<li><a href="#">我的优惠券</a></li>
				<li><router-link to="/address">我的地址</router-link></li>
				<li><a href="#">我的拼团</a></li>
				<li>
					<a href="#">
						<span>我的免单券</span>
						<span class="amount">0张</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span>借钱</span>
						<span class="new">新用户免费领1000元</span>
					</a>
				</li>
			</ul>
		</div>
		<div class="service">
			<ul>
				<li><a href="#">客服中心</a></li>
				<li><a href="#">关于卷皮</a></li>
			</ul>
		</div>
		<div class="footer">
			<ul>
				<li><router-link to="/home">返回首页</router-link></li>
				<li><a href="#">客户端</a></li>
				<li><a href="#">电脑端</a></li>
			</ul>
		</div>
		<JuPiNav></JuPiNav>
	</div>

</template>

<script type="text/ecmascript-6">
	import JuPiNav from '../../components/JuPiNav';
	import http from '../../util/http.js';

	export default {
		components:{ JuPiNav },
		data() {
		        return {
		                account: ''
		        }
		},
		methods: {
		        backLogin() {
		                this.$confirm('确认退出?')
			                .then(() => {
                                                sessionStorage.removeItem('token');
                                                this.account = '';
			                });
		        }
		},
		created() {
		        if(sessionStorage.getItem('token')) {
                                http({
                                        url: '/profile/phone',
                                        loading: false,
	                                withToken: true
                                }).then((data) => {
                                        this.account = data;
                                });
		        }

		},
	};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		width: 100%
		height: 100%
		background-color: #f4f4f4
		overflow: auto
		padding-bottom: 1rem
		.header
			background: url(./images/background.png) no-repeat
			background-size: cover
			padding: 0.1rem 0.3rem
			.header-top
				display: flex
				height: 1rem
				*
					color: white
					line-height: 1rem
				a.back
					flex-shrink: 0
					width: 1rem
					font-size: 0.38rem
				h1.title
					flex-grow: 1
					font-weight: normal
					font-size: 0.34rem
					text-align: center
				button.btn-edit
					flex-shrink: 0
					width: 1rem
					border: 0
					outline: none
					background-color: transparent
					font-size: 0.26rem
					&.visible
						visibility: hidden
			.header-bottom
				display: flex
				padding: 0.2rem 0
				*
					color: white
				img
					flex-shrink: 0
					width: 1rem
					height: 1rem
					border-radius: 50%
				.user
					flex-grow: 1
					margin-left: 0.2rem
					p
						font-size: 0.32rem
						margin-bottom: 0.2rem
					span
						font-size: 0.26rem
						padding: 0.01rem 0.1rem
						border-radius: 0.2rem
						border: 1px solid #f3414a
			.no-user
				padding-bottom : 0.4rem
				display: flex
				a
					flex-grow: 1
					font-size: 0.3rem
					padding: 0 0.4rem
				a.register
					text-align: right
					border-right: 4px solid #fff
		.order
			background-color: white
			.order-top
				display: flex
				justify-content: space-between
				height: 1rem
				box-sizing: border-box
				padding: 0.2rem 0
				margin: 0 0.3rem
				border-bottom: 1px solid #ccc
				span
					line-height: 0.6rem
					font-size: 0.28rem
					&.all-order
						color: #999
			.order-bottom
				padding: 0.2rem 0.3rem
				ul
					display: flex
					li
						flex-grow: 1
						a
							display: flex
							flex-direction: column
							align-items: center
							color: #666
							outline: none
							i
								font-size: 0.5rem
								margin-bottom: 0.2rem
		.content
			padding: 0 0.3rem
			margin: 0.2rem 0
			background-color: white
			ul
				li
					height: 1rem
					border-bottom: 1px solid #ccc
					a
						display: flex
						height: 100%
						line-height: 1rem
						justify-content: space-between
						color: #333
						font-size: 0.28rem
						span.amount,
						span.new
							color: #999
		.service
			background-color: white
			ul
				li
					height: 1rem
					padding: 0 0.3rem
					border-bottom: 1px solid #ccc
					a
						display: inline-block
						outline: none
						height: 100%
						line-height: 1rem
						color: #333
						font-size: 0.28rem
		.footer
			margin-top: 0.2rem
			background-color: white
			ul
				display: flex
				li
					flex-grow: 1
					height: 1rem
					padding: 0 0.3rem
					a
						outline: none
						display: inline-block
						width: 100%
						height: 100%
						line-height: 1rem
						text-align: center
						color: #333
						font-size: 0.26rem
		ul.nav
			position: fixed
			bottom: 0
			left: 0
			width: 100%
			height: 1rem
			background-color: white
</style>