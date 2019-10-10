<template>
	<div class="pwd-wrapper">
		<LoginInput placeholder="手机号/邮箱/用户名" @change="value => account = value"></LoginInput>
		<LoginInput :type=" isPassword ? 'password' : 'text' " placeholder="密码" @change="value => pwd = value"></LoginInput>
		<i class="iconfont icon-eye" @click="isPassword = !isPassword"></i>
		<LoginButton value="登录" :click="login" :class="(account !== '' && pwd !== '') ? 'active' : '' "></LoginButton>
	</div>
</template>

<script type="text/ecmascript-6">
	import LoginInput from './LoginInput';                               //导入 文本框的组件
        import LoginButton from './LoginButton';                         //导入 按钮组件
	import http from '../../util/http.js';

        export default {
                components: { LoginInput, LoginButton },
	        data: function() {
                        return {
                                account: '',
	                        pwd: '',
	                        isPassword: true,                                       // 标识 文本框的类型 ，默认为 密码框
                        }
	        },
	        methods: {
			login(e) {
				http({
					url: '/user/login/pwd',
					data: {
					        name: this.account,
						pwd: this.pwd,
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
			}
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.pwd-wrapper
		position: relative
		i
			position: absolute
			top: 1.4rem
			right: 0.4rem
			font-size: 0.36rem
			color: #333

</style>