<template>
	<div class="page-wrapper">
		<div class="header">
			<a class="iconfont icon-back back" @click="$router.back()"></a>
			<h1 class="title">注册</h1>
		</div>
		<p class="promot">请确保你的手机畅通，用于接收验证码短信</p>
		<div class="register-input">
			<input type="text" placeholder="用户名" @input="e => name = e.target.value">
			<input type="text" placeholder="请输入手机号码" @input="e => phone = e.target.value" @blur="checkPhone">
			<input :type="isPassword ? 'password' : 'text' " placeholder="密码" @input="e => pwd = e.target.value" >
			<i class="iconfont icon-eye" @click="isPassword = !isPassword"></i>
			<input type="text" placeholder="请输入验证码" @input="e => code = e.target.value">
			<span class="get-code" v-text="hasCode === '' ? '点击获取验证码' : hasCode" @click="getCode"></span>
		</div>
		<button class="btn-register" :class="(phone !== '' && code !== '') ? 'active' : '' "  @click="register">确 定</button>
	</div>
</template>

<script type="text/ecmascript-6">
	import http from '../../util/http';
	import Vue from 'vue';

        export default {
                data() {
                        return {
                                name: '',
                                phone: '',
	                        pwd: '',
	                        code: '',
	                        hasCode: '',
	                        isPassword: true,
                        }
                },
	        methods: {
                        checkPhone() {
                                let phone = this.phone;
                                if(!(/^1[3456789]\d{9}$/.test(phone))){
                                        Vue.prototype.$alert('请确认手机号码是否有误');
                                        return false;
                                }
                        },
                        getCode() {
                                http({
                                        url: '/register/getcode',
                                        loading: false
                                }).then(data => {
                                        this.hasCode = data;
                                });
                        },
		        register() {
                                http({
	                                url:'/register/getregister',
					data: {
	                                        name: this.name,
						phone: this.phone,
						pwd: this.pwd,
						code: this.code
					},
                                }).then(() => {
                                        Vue.prototype.$alert('注册成功');
	                                this.$router.push('/login');
                                })
		        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		width: 100%
		height: 100%
		background: url('./img.png') center center
		text-align: center
		box-sizing: border-box
		padding: 2rem 0.2rem
		.header
			display: flex
			position: relative
			padding-bottom: 0.2rem
			border-bottom: 3px solid #ccc
			a.back
				flex-shrink: 0
				position: absolute
				top: 50%
				left: 0.4rem
				transform: translateY(-50%)
				font-size: 0.24rem
			h1.title
				flex-grow: 1
				text-align: center
				font-weight: normal
				font-size: 0.32rem
		p.promot
			padding: 0.2rem 0
			color: #666
		.register-input
			width: 100%
			position: relative
			input
				width: 90%
				height: 0.8rem
				border: none
				outline: none
				border-bottom: 1px solid #ccc
				font-size: 0.2rem
			i.icon-eye
				position: absolute
				top: 1.9rem
				right: 0.6rem
				font-size: 0.24rem
			span
				position: absolute
				top: 2.8rem
				right: 0.4rem
		button.btn-register
			width: 80%
			height: 0.7rem
			margin-top: 0.4rem
			font-size: 0.26rem
			border-radius: 0.3rem
			color: white
			&.active
				background-color: #ff464e

</style>