<template>
	<el-form class="form" label-width="100px" :status-icon="true" :model="model" :rules="rules" ref="form">
		<el-form-item label="原始密码" prop="oldPwd">
			<el-input type="password" v-model="model.oldPwd"></el-input>
		</el-form-item>
		<el-form-item label="新密码" prop="newPwd">
			<el-input type="password" v-model="model.newPwd"></el-input>
		</el-form-item>
		<el-form-item label="新密码确认" prop="checkNewPwd">
			<el-input type="password" v-model="model.checkNewPwd"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="changePwd">确定</el-button>
		</el-form-item>
	</el-form>
</template>

<script type="text/ecmascript-6">
	import http from '../../util/http.js';

        export default {
                data() {
                        return {
                                model: {
                                        oldPwd: '',
                                        newPwd: '',
                                        checkNewPwd:''
                                },
	                        rules: {
                                        oldPwd: [
	                                        { required: true, trigger: 'blur', message: '原始密码不能为空' },
	                                        { min: 4, max: 10, trigger: 'blur', message: '密码的长度必须是 4-10 位'}
                                        ],
		                        newPwd: [
		                                //自定义验证写法：
			                        {validator: this.validatePass1, trigger: 'blur' }
		                        ],
		                        checkNewPwd: [
			                        { validator: this.validatePass2, trigger: 'blur' }
		                        ]
	                        }
                        };
                },
	        methods: {
			validatePass1(rule,value,callback) {
			        if(value === '') callback(new Error('密码不能为空'));
			        else if(value.length < 4 || value.length > 16) callback(new Error('密码长度必须在 4-16 位之间'));
			        else if(this.model.checkNewPwd !== '') {
			                this.$refs.form.validator('checkNewPwd');
			                callback();
			        }
			        else callback();
			},
		        validatePass2(rule, value, callback ) {
			        if(value === '') callback(new Error('密码不能为空'));
			        else if(value.length < 4 || value.length > 16) callback(new Error('密码长度必须在 4-16 位之间'));
			        else if(this.model.newPwd !== this.model.checkNewPwd) callback(new Error('两次输入的密码不一致'));
			        else callback();
		        },
		        changePwd() {
				http({
					url: '/user/changepwd',
					data: this.model,
					withToken: true
				}).then(() => this.$refs.form.resetFields());
		        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.form
		width: 400px
</style>