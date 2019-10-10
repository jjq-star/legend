<!--在 模板 template区域进行‘声明式’的渲染：声明式渲染的目的是已经将指定的区域和dom关联在了一起-->
<!--组件的template内有且仅有一个根节点-->
<!--组件的template区域可以无条件的访问组件的 data中的 和 computed中的 数据-->
<template>
	<div class="page-wrapper">
		<div class="header">
			<div class="header-form">
				<button type="submit" class="search-btn">
					<img src="./search.png" >
				</button>
				<input type="text" placeholder="搜索商品" class="search">
			</div>
		</div>
		<div class="content">
			<div class="left">
				<ul>
					<li v-for="item in mainList" v-bind:key="item.id" v-bind:class="{active : activeId === item.id}" @click="toggleId(item.id)">
						<span v-text="item.name" v-bind:class="{active : activeId === item.id}"></span>
					</li>
				</ul>
			</div>
			<div class="right">
				<div class="right-wrapper">
					<ul class="clearfix" v-if="subList.length > 0">
						<li v-for="item in subList" v-bind:key="item.id">
							<router-link :to="`/list/${ activeId }/${ item.id }`">
								<img :src="item.avatar" alt="">
								<span v-text="item.name"></span>
							</router-link>
						</li>
					</ul>
					<p v-else>暂无相关数据，敬请期待...</p>
				</div>
			</div>
		</div>
		<div class="footer">
			<JuPiNav></JuPiNav>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import JuPiNav from '../../components/JuPiNav';         //导入菜单组件
        import { createNamespacedHelpers } from 'vuex';         //在 vuex 中有一个方法可以实现映射！特殊的导入方式
        //解构赋值;并不需要全部解构出来，需要映射哪个就解构哪个
	let { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('category');
	export default {
		components: { JuPiNav },                //注册菜单组件
		//组件相关的数据：
		//1.data中存放
		//2.计算属性 存放（计算属性 一定一定要返回一个结果）
		computed: {
		        //映射   ... 展开运算符
			...mapState(['list','activeId']), //映射哪一个，就在参数中写哪一个，这些参数都是字符串
			...mapGetters(['subList']),
		        mainList: function() {
		                return this.list.filter(item => item.fid === 0);
		        },
			avatar: function() {
		                return this.activeId === 0 ? '' : this.list.find(item => item.id === this.activeId).avatar;
			}
		},
		//存入当前组件中所有的自定义方法
//		methods:{ //映射
//			...mapActions(['init', 'toggleId'])
//		},
		methods: mapActions(['init', 'toggleId']),
		//3.组件的 生命周期的 钩子函数
		created: function() {
		        this.init()
			        .then(data => this.toggleId(data[0].id));
	        },
	};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		display: flex
		flex-direction: column
		height: 100%
		width: 100%
		.header
			height: 1rem
			flex-shrink: 0
			box-sizing: border-box
			padding: 0.2rem 0.4rem
			.header-form
				height: 0.6rem
				display: flex
				border: 1px solid #ccc
				button.search-btn
					width: 0.6rem
					flex-shrink: 0
					border: 0
					outline: none
					background-color: white
					img
						width: 0.4rem
						height: 0.4rem
				input.search
					flex-grow: 1
					border: 0
					font-size: 0.24rem
					outline: none
		.content
			flex-grow: 1
			border-top: 1px solid #999
			border-bottom: 1px solid #ccc
			display: flex
			overflow: auto
			.left
				flex-shrink: 0
				width: 1.8rem
				border-right: 1px solid #000
				ul
					height: 100%
					overflow: auto
					background-color: #f9f9f9
					li
						border-bottom: 1px solid #ccc
						line-height: 0.87rem
						text-align: center
					li.active
						border-left: 2px solid #ff464e
						span
							font-size: 0.26rem
						span.active
							color: #ff464e
			.right
				flex-grow: 1
				padding: 0 0.4rem
				overflow: auto
			 .right-wrapper
				overflow: hidden
				ul
					margin-right: -0.4rem
					li
						width: 33.333%
						box-sizing: border-box
						padding-right: 0.4rem
						margin-bottom: 0.2rem
						float: left
						a
							display: flex
							flex-direction: column
							align-items: center
							img
								width: 100%
								text-align: center
							span
								color: #333
								margin-top: 0.2rem
		.footer
			width: 100%
			height: 1rem
			flex-shrink: 0
</style>