<template>
	<div class="phone-wrapper">
		<LoginInput placeholder="+86 手机号码" @change="value => phone = value" @blur.native.capture="checkPhone"></LoginInput>
		<LoginInput placeholder="短信验证码" @change="value => code = value" ></LoginInput>
		<span class="get-code" v-text="hasCode === '' ? '点击获取验证码' : hasCode" @click="getCode"></span>
		<LoginButton value="立即登录/注册" :click="login" :class="(phone !== '' && code !== '') ? 'active' : '' "></LoginButton>
	</div>
</template>

<script type="text/ecmascript-6">
	import LoginInput from './LoginInput';
	import LoginButton from './LoginButton';
	import http from '../../util/http.js';

        export default {
                components: { LoginInput, LoginButton },
                data: function() {
                        return {
                                phone: '',
                                code: '',
	                        hasCode: ''
                        };
                },
                methods: {
                        getCode() {
                                http({
	                                method: 'get',
	                                url: '/user/login/code',
	                                loading: false
                                }).then(data => {
                                        this.hasCode = data;
                                });
                        },
                        login(e) {
                                http({
	                                url: '/user/login/phone',
	                                data: {
	                                        phone: this.phone,
		                                code: this.code
	                                },
                                        loading: false,
                                        loadingEl: e.target
                                }).then(token => {
                                        sessionStorage.setItem('token',token);
                                        if(this.$route.params.reference === '/register') {
                                                this.$router.push('/home');
                                        } else {
                                                this.$router.replace(this.$route.params.reference);
                                        }
//                                        this.$router.replace(this.$route.params.reference);
                                });
                        },
	                checkPhone(){
                                let phone = this.phone;
		                if(!(/^1[3456789]\d{9}$/.test(phone))){
		                        Vue.prototype.$alert('请确认手机号码是否有误');
		                        return false;
		                }
		        },
                },
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.phone-wrapper
		position: relative
		span.get-code
			position: absolute
			top: 1.2rem
			right: 0.4rem
			height: 0.6rem
			line-height: 0.6rem
			padding: 0 0.2rem
			font-size: 0.2rem
			background-color: transparent
			color: black
</style>