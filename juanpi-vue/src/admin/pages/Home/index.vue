<template>
	<el-container class="root">
		<el-header>
			<h1>卷皮后台管理系统</h1>
			<div class="profile">
				<h2>用户名: <span v-text="name"></span></h2>
				<el-button type="text" size="medium" @click="back" round>退出</el-button>
			</div>
		</el-header>
		<el-container>
			<el-aside>
				<el-menu
					:default-active="key"
					@select="handleMenuSelect"
					background-color="#545c64"
					text-color="#fff"
					active-text-color="#ffd04b">
					<el-menu-item index="password">
						<i class="el-icon-user-solid"></i>
						<span>账号设置</span>
					</el-menu-item>
					<el-submenu index="manage">
						<template slot="title">
							<i class="el-icon-s-goods"></i>
							<span>商品管理</span>
						</template>
						<el-menu-item index="category">
							<i class="el-icon-menu" ></i>
							<span>商品分类管理</span>
						</el-menu-item>
						<el-menu-item index="product">
							<i class="el-icon-menu"></i>
							<span>商品信息管理</span>
						</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-container>
				<el-main>
					<el-tabs editable type="card" v-model="key" @tab-remove="handleTabRemove">
						<el-tab-pane v-for="item in tabs" :key="item" :label="tabMap[item].label" :name="item">
							<component :is="tabMap[item].component"></component>
						</el-tab-pane>
					</el-tabs>
				</el-main>
				<el-footer>
					<span>&copy; 版权所有: 鉴京群</span>
					<span>Tel: 13468266296</span>
					<span>emil: jjq0327@163.com</span>
				</el-footer>
			</el-container>
		</el-container>
	</el-container>
</template>

<script type="text/ecmascript-6">
        import Password from '../Password';
        import Category from '../Category';
        import Product from '../Product';

        export default {
                data() {
                        return {
                                name: sessionStorage.getItem('name'),
                                key: '',                                //记录当前哪一个激活
                                tabs: [],
                                tabMap: {
                                        password: {
                                                label: '修改密码',
                                                component: Password
                                        },
                                        category: {
                                                label: '商品分类管理',
                                                component: Category
                                        },
                                        product: {
                                                label: '商品信息管理',
                                                component: Product
                                        }
                                }
                        };
                },
                methods: {
                        handleMenuSelect(key) {
                                if(this.tabs.indexOf(key) === -1) this.tabs.push(key);
                                this.key = key;
                        },
                        handleTabRemove(key) {
                                let i = this.tabs.indexOf(key);
                                this.tabs.splice(i,1);
                                this.key = this.tabs.length > 0 ? this.tabs[0] : '';
                        },
                        back() {
                                sessionStorage.removeItem('token');
                                sessionStorage.removeItem('name');
                                this.name = '';
                        }
                },
                watch: {
                        name(newValue) {
                                this.$router.push('/login');
                        }
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.root
		width: 100%
		height: 100%
		min-width: 1200px
		.el-header
			display: flex
			justify-content: space-between
			align-items: center
			background-color: #000
			h1
				font-size: 26px
				color: white
				letter-spacing: 0.2rem
			.profile
				display: flex
				align-items: center
				padding: 0 18px
				h2
					font-size: 18px
					color: white
					margin-right: 12px
				button
					font-size: 16px
		.el-aside
			background-color: #545c64
			.el-menu
				border: none
		.el-footer
			display: flex
			align-items: center
			background-color: #606266
			span
				flex-grow: 1
				font-size: 14px
				color: white
</style>