<template>
	<div class="page-wrapper">
		<div class="header">
			<a  @click="$router.back()" class="iconfont icon-back"></a>
			<button class="iconfont icon-more" @click="isPopup = !isPopup"></button>
			<div class="more-popup" v-if="isPopup">
				<ul>
					<li><router-link to="/home">首页</router-link></li>
					<li><router-link to="/profile">个人中心</router-link></li>
					<li><router-link to="/category">商品分类</router-link></li>
				</ul>
			</div>
		</div>
		<div class="content">
			<div class="banner" ref="banner">
				<ul v-if="bannerImages.length > 0" :style="{ width: (bannerImages.length + 2) + '00%'}">
					<li><img :src="bannerImages[bannerImages.length - 1]" alt=""></li>
					<li v-for="(item,i) in bannerImages" :key="i">
						<img :src="item" alt="">
					</li>
					<li><img :src="bannerImages[0]" alt=""></li>
				</ul>
				<span class="indicator">{{ bannerIndex }}/ {{ bannerImages.length }}</span>
			</div>
			<div class="particular clearfix">
				<em class="price">￥{{ model.price }}</em>
				<span class="sale" >{{model.sale}}人已购</span>
				<h3 class="title" v-text="model.name"></h3>
			</div>
		</div>
		<div class="other">
			<div class="service">
				<ul>
					<li>24小时发货</li>
					<li>7天包退</li>
					<li>售后补贴</li>
				</ul>
				<span class="iconfont icon-more"></span>
			</div>
		</div>
		<div class="checked">
			<p>已选择尺码: {{ productSize }}</p>
			<span class="iconfont icon-goright" @click="isShopping = true"></span>
		</div>
		<div class="footer">
			<ul>
				<li>
					<router-link to="/home">
						<i class="iconfont icon-home"></i>
					</router-link>
				</li>
				<li class="cart">
					<router-link to="/cart">
						<i class="iconfont icon-cart"><em class="shopping-count" v-if="carCount > 0" v-text="carCount"></em></i>
					</router-link>
				</li>
			</ul>
			<button type="button" class="btn-addproduct" @click="isShopping = true">加入购物车</button>
		</div>
		<JuPiPopup v-show="isShopping" @close="isShopping = false">
			<div class="shopping-dialog">
				<div class="shopping-dialog-header">
					<img class="avatar" :src="model.avatar" alt="" />
					<div class="right">
						<h3 class="name" v-text="model.name"></h3>
						<p class="size">已选择尺码 {{ productSize }}</p>
						<em class="price">￥{{ model.price }}</em>
					</div>
				</div>
				<div class="shopping-dialog-specs">
					<h4>尺码</h4>
					<ul>
						<li v-for="(item,i) in size" :key="i" v-text="item" :class="item === productSize ? 'active' : ''" @click="getSize"></li>
					</ul>
				</div>
				<div class="shopping-dialog-content">
					<span class="title">数量</span>
					<div class="count-wrapper clearfix">
						<JuPiCount :count="count"  :increase="increase" :decrease="decrease"></JuPiCount>
					</div>
				</div>
				<div class="shopping-dialog-footer">
					<button class="btn-add-cart" @click="addProduct">确定</button>
				</div>
			</div>
		</JuPiPopup>
	</div>
</template>

<script type="text/ecmascript-6">
	import http from '../../util/http.js';
	import { mapActions } from 'vuex';
	import IScroll from 'iscroll';
	import imagesLoaded from 'imagesloaded';
	import JuPiPopup from '../../components/JuPiPopup';
	import JuPiCount from '../../components/JuPiCount';

	export default{
	        components: { JuPiPopup,JuPiCount },
		data() {
		        return {
		                id: 0,                                                          //商品 id 默认为0，在创建组件的时候，获取传过来的 id
		                model: {},                                                      //商品详情
                                bannerIndex: 0,                                         // 标识 当前的 轮播图中 是哪一张图片被激活，默认没0  即数据还没回来
		                isPopup: false,                                         //标识 弹窗是否出现，默认不出现
			        isShopping: false,                                      //标识 是否处于购物状态
			        carCount: 0,                                            //购物车中的商品数量，默认为0
			        count: 1,                                               //购买商品的数量，默认为 1
			        productSize: 'L',
		        }
		},
                watch: {
                        id(newValue) {                          // s实时监测 id值， 如果 id 发生变化，即通知仓库请求数据
				this.getItem(newValue).then(data => {
				        this.model = data;
                                });
                        },
	                bannerImages(newValue) {                //轮播图跟谁相关，就应该监测谁
				if(newValue.length === 0) return;                       //还没有拿到图片
				this._initbannerScroll();
	                }
                },
		computed: {
		        bannerImages() { return this.model.bannerImages ? this.model.bannerImages.split(',') : []; },   //数据会有真空期，因此要判断 model.bannerImgs 是否为空
			size() { return this.model.size ? this.model.size.split(',') : []; }
		},
		created() {
                        this.id = parseInt(this.$route.params.id);              //将 路由中传过来的id 拿出来赋给 当前id
			this._getCarCount();
		},
		methods: {
			...mapActions('product',['getItem']),
                        _initbannerScroll() {                                            //给 watch 绑的方法
				this.$nextTick(() => {                                  //保证 banner 对应的 html元素更新完毕
                                        imagesLoaded(this.$refs.banner,() => {          //保证 iscroll 区域所有的图片加载完毕
					        this.$nextTick(() => {                                  //保证 iscroll 区域所有的样式 渲染完毕
					                this.bannerScroll = new IScroll(this.$refs.banner, {
					                        scrollY: false,                                         //关闭纵向滚动
						                scrollX: true,                                          //开启横向滚动
						                momentum: false,                                //关闭惯性滚动
						                snap: true,                                             //开启轮播图模式
					                });
							this.bannerScroll.on('scrollStart',() => {
							        clearTimeout(this.timer);                       //停止自动播放
							});
							this.bannerScroll.on('scrollEnd',() => {
							        //调整整个滚动条的位置，实现无缝滚动
								let len = this.bannerImages.length + 2;
								if(this.bannerScroll.currentPage.pageX === 0) {
								        this.bannerScroll.disable();            //调整期间，禁止滚动
									setTimeout(() => {
									        this.bannerScroll.goToPage(len-2, 0, 0);
									        this.bannerScroll.enable();     //调整结束，恢复滚动
									},10)
								}
								if(this.bannerScroll.currentPage.pageX === len - 1) {
								        this.bannerScroll.enable();
								        setTimeout(() => {
								                this.bannerScroll.goToPage(1,0,0);
								                this.bannerScroll.enable();
								        },10)
								}
								let curPage = this.bannerScroll.currentPage.pageX;
								if(curPage === 0) this.bannerIndex = len - 2;
								else if(curPage === len - 1) this.bannerIndex = 1;
								else this.bannerIndex = curPage;
                                                                this.timer = setTimeout(() => this.bannerScroll.next(),2000);        //开始自动播放
                                                        });
							this.bannerScroll.goToPage(1,0,0);                      //初始化显示 第二页，即第一张图片
						        this.bannerIndex = 1;                                           //记录当前更新是 第几张
						        this.timer = setTimeout(() => this.bannerScroll.next(),2000);        //开始自动播放
					        });
					});
				});
			},
			getSize(e) {
			        this.productSize = e.target.innerText;
			        this.count = 1;
			},
                        addProduct() {
				http({
					url: '/cart/addproduct',
					data: {
					        pid: this.id,
						count: this.count,
						size: this.productSize
					},
					withToken: true,
					loading: false
				}).then(() => {
				        this.carCount = this.count + this.carCount;
				        this.count = 1;
				        this.isShopping = false;
				});
                        },
			_getCarCount() {
			        if(sessionStorage.getItem('token')) {
			                http({
						method: 'get',
				                url: '/cart/getcount',
				                withToken: true,
				                loading: false
			                }).then((data) => {
			                        this.carCount = data;
			                })
			        } else {
			                this.carCount = 0;
			        }
			},
			increase() {
                                if(this.count === 10) {
                                        this.$notice('商品数量达到上限了哦...');
                                        return;
                                }
                                this.count = this.count + 1;
			},
			decrease() {
                                if(this.count === 1) {
                                        this.$notice('商品数量达到下限了哦...');
                                        return;
                                }
                                this.count = this.count - 1;
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.shopping-dialog
		width: 100%
		display: flex
		flex-direction: column
		margin: 0.5rem 0
		padding: 0 !important
		.shopping-dialog-header
			display: flex
			align-items: center
			padding: 0.28rem
			img.avatar
				width: 1.8rem
				background-color: #f4f4f4
			.right
				padding: 0 0.4rem
				text-align: left
				h3.name
					font-weight: normal
					font-size: 0.32rem
					padding: 0.1rem 0
				p.size
					font-size: 0.28rem
					color: #999
					padding: 0.1rem 0
				em.price
					font-size: 0.3rem
					color: #ff464e
					font-style: normal
					font-weight: bold
		.shopping-dialog-specs
			padding: 0.3rem 0.2rem
			h4
				font-size: 0.34rem
				font-weight: 400
				margin-bottom: 0.2rem
			ul
				display: flex
				flex-wrap: wrap
				li
					width: 20%
					height: 0.6rem
					margin: 0.1rem 0.3rem
					border: 1px solid #666
					text-align: center
					line-height: 0.6rem
					font-size: 0.3rem
					color: #333
					&.active
						background-color: #FF464E
						border: 1px solid white
						color: white
		.shopping-dialog-content
			flex-grow: 1;
			border-top: 1px solid #ccc
			padding: 0.3rem 0.2rem
			span
				display: block
				margin: 0.2rem 0 0.3rem
				font-size: 0.28rem
			.count-wrapper
				.jupi-count
					float: right
		.shopping-dialog-footer
			height: 1.06rem
			padding: 0 0.3rem
			display: flex
			align-items: center
			button.btn-add-cart
				width: 100%
				height: 0.84rem
				line-height: 0.84rem
				text-align: center
				color: #fff
				background-color: #ff464e
				border-radius: 0.42rem
				font-size: 0.3rem
				margin-top: 0.3rem
	.page-wrapper
		width: 100%
		height: 100%
		box-sizing: border-box
		padding-bottom: 1.2rem
		display: flex
		flex-direction: column
		.header
			flex-shrink: 0
			width: 100%
			position: fixed
			top: 0
			left: 0
			z-index: 10
			height: 1rem
			line-height: 1rem
			background-color: transparent
			box-sizing: border-box
			padding: 0 0.2rem
			display: flex
			justify-content: space-between
			align-items: center
			a
				color: white
				width: 0.6rem
				font-size: 0.4rem
			button
				width: 0.6rem
				height: 0.6rem
				background-color: rgba(0,0,0,0.3)
				color: white
				font-size: 0.5rem
				border: 0
				border-radius: 50%
				outline: none
			.more-popup
				position: absolute
				top: 0.9rem
				right: 0
				width: 1.6rem
				height: 2rem
				background-color: rgba(0,0,0,0.3)
				padding: 0.1rem
				ul
					width: 100%
					height: 100%
					display: flex
					flex-direction: column
					li
						width: 100%
						flex-grow: 1
						line-height: 0.4rem
						margin-bottom: 0.2rem
						border-bottom: 1px solid #ccc
						a
							color: white
							font-size: 0.32rem
		.content
			.banner
				overflow: hidden
				padding: 0
				touch-action: pan-x
				position: relative
				ul
					display: flex
					li
						flex-grow: 1
						img
							width: 100%
				span.indicator
					position: absolute
					right: 0.3rem
					bottom: 0.3rem
					z-index: 80
					padding: 0 0.16rem
					height: 0.5rem
					line-height: 0.5rem
					border-radius: 0.3rem
					color: white
					background-color: rgba(0, 0, 0, 0.5)
			.particular
				padding: 0.2rem
				em.price
					font-style: normal
					font-size: 0.38rem
					color: #FF464E
				span.sale
					float: right
					font-size: 0.28rem
					color: #999
				h3.title
					font-size: 0.4rem
					color: #333
					font-weight: 400
					margin-top: 0.2rem
		.other
			background-color: #f4f4f4
			.service
				display: flex
				height: 1rem
				ul
					flex-grow: 1
					display: flex
					li
						flex-grow: 1
						flex-basis: 0
						text-align: center
						line-height: 1rem
						font-size: 0.3rem
						color: #666
				span
					width: 0.8rem
					flex-shrink: 0
					font-size: 0.5rem
					line-height: 1rem
					text-align: center
					color: #999
		.checked
			display: flex
			justify-content: space-between
			background-color: #f4f4f4
			height: 1rem
			line-height: 1rem
			box-sizing: border-box
			padding: 0 0.2rem
			margin: 0.2rem 0
			font-size: 0.26rem
			span
				width: 0.4rem
				text-align: center
				font-size: 0.2rem
		.footer
			display: flex
			width: 100%
			height: 0.96rem
			border-top: 1px solid #999
			position: fixed
			bottom: 0
			left: 0
			ul
				flex-grow: 1
				display: flex
				li
					flex-grow: 1
					flex-basis: 0
					border-right: 1px solid #999
					&.cart
						a
							i
								position: relative
								em
									display: inline-block;
									position: absolute;
									top: -0.2rem;
									right: -0.2rem;
									width: 0.36rem;
									height: 0.36rem;
									line-height: 0.36rem;
									text-align: center;
									border-radius: 0.16rem;
									background-color: #FF464E;
									color: white;
									font-size: 0.24rem;
									font-style: normal;
					a
						display: flex
						height: 100%
						flex-direction: column
						align-items: center
						justify-content: center
						i
							font-size: 0.4rem
							color: #999
			button.btn-addproduct
				flex-shrink: 0
				width: 2rem
				height: 100%
				border: 0
				background-color: #FF464E
				color: white
				font-size: 0.24rem
</style>