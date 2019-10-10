<template>
	<div class="page-wrapper" id="top">
		<img v-if="display" class="goTop" src="./images/goTop.png" @click="toTop">
		<div class="header">
			<router-link to="/category" class="header-left">
				<img src="./images/search.png" >
				<span class="name">卷皮</span>
				<span class="search">搜索</span>
			</router-link>
		</div>
		<div class="banner" ref="banner">
			<ul>
				<li>
					<img src="./images/banners/banner-05.jpg" >
				</li>
				<li>
					<img src="./images/banners/banner-01.png" >
				</li>
				<li>
					<img src="./images/banners/banner-02.jpg" >
				</li>
				<li>
					<img src="./images/banners/banner-03.png" >
				</li>
				<li>
					<img src="./images/banners/banner-04.png" >
				</li>
				<li>
					<img src="./images/banners/banner-05.jpg" >
				</li>
				<li>
					<img src="./images/banners/banner-01.png" >
				</li>
			</ul>
		</div>
		<div class="promote">
			<div class="promote-top">
				<ul>
					<li><a href="#"><img src="./images/title/title-01.png" ></a></li>
					<li><a href="#"><img src="./images/title/title-02.png" ></a></li>
					<li><a href="#"><img src="./images/title/title-03.png" ></a></li>
					<li><a href="#"><img src="./images/title/title-04.png" ></a></li>
				</ul>
			</div>
			<div class="promote-center">
				<img src="./images/title/title-05.gif" >
			</div>
			<div class="promote-bottom">
				<div class="promote-bottom-up">
					<img src="./images/title/title-06.png" >
					<img src="./images/title/title-07.png" >
				</div>
				<div class="promote-bottom-down">
					<img src="./images/title/title-08.png" >
					<img src="./images/title/title-09.png" >
					<img src="./images/title/title-10.png" >
				</div>
			</div>
		</div>
		<div class="praise">
			<img src="./images/title/title-11.png" >
		</div>
		<div class="content">
			<div class="title">
				<span :class="isActive ? 'active' : '' " @click="isActive = true">精选专场</span>
				<span  :class="!isActive ? 'active' : '' " @click="isActive = false">精选单品</span>
			</div>
			<ul>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-01.jpg" alt="">
						<img src="./images/shopping.png" class="august">
						<div class="text">
							<p class="price">49.9元2件任选</p>
							<span class="name">知名品牌代工厂！强势清货！！专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-02.jpg" alt="">
						<div class="text">
							<p class="price">29元1件任选</p>
							<span class="name">冠军树女鞋热卖专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-03.jpg" alt="">
						<div class="text">
							<p class="price">99元16件任选</p>
							<span class="name">良品铺子休闲零食品质专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-04.jpg" alt="">
						<div class="text">
							<p class="price">满3件6.6折</p>
							<span class="name">歌琪奴女鞋上新专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category/index.html">
						<img src="./images/content/content-05.jpg" alt="">
						<img src="./images/shopping.png" class="august">
						<div class="text">
							<p class="price">49.9元1件任选</p>
							<span class="name">聚乐优品潮流女包上新专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-06.jpg" alt="">
						<img src="./images/shopping.png" class="august">
						<div class="text">
							<p class="price">满1件减10元</p>
							<span class="name">思曼莉服饰女装上新专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-07.jpg" alt="">
						<img src="./images/shopping.png" class="august">
						<div class="text">
							<p class="price">满3件7折</p>
							<span class="name">黎优家纺家纺清仓专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-08.jpg" alt="">
						<div class="text">
							<p class="price">满199元减80元</p>
							<span class="name">阿巴松坚果专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-09.jpg" alt="">
						<div class="text">
							<p class="price">满3件4折</p>
							<span class="name">HZC美妆进口美妆专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-10.jpg" alt="">
						<img src="./images/shopping.png" class="august">
						<div class="text">
							<p class="price">满1件减4元</p>
							<span class="name">欧美潮流服饰美妆品质专场</span>
							<span class="days">剩8天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-11.jpg" alt="">
						<img src="./images/shopping.png" class="august">
						<div class="text">
							<p class="price">满3件4.8折</p>
							<span class="name">微菲尔银饰热卖专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-12.jpg" alt="">
						<img src="./images/shopping.png" class="august">
						<div class="text">
							<p class="price">¥19.8-119.8</p>
							<span class="name">依尚街区女装上新专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-13.jpg" alt="">
						<div class="text">
							<p class="price">满3件减45元</p>
							<span class="name">爱梦熊连衣裙专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-14.jpg" alt="">
						<img src="./images/shopping.png" class="august">
						<div class="text">
							<p class="price">满199元减80元</p>
							<span class="name">水槽台面沥水收纳架</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-15.jpg" alt="">
						<img src="./images/shopping.png" class="august">
						<div class="text">
							<p class="price">满59元减8元</p>
							<span class="name">伊诺家纺品质专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-16.jpg" alt="">
						<div class="text">
							<p class="price">满3件4折</p>
							<span class="name">欧昵雪女装清仓专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-17.jpg" alt="">
						<img src="./images/shopping.png" class="august">
						<div class="text">
							<p class="price">9.9元1件任选</p>
							<span class="name">苗希童装清仓专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-18.jpg" alt="">
						<img src="./images/shopping.png" class="august">
						<div class="text">
							<p class="price">满2件5折</p>
							<span class="name">亚思特居家收纳热卖专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-19.jpg" alt="">
						<div class="text">
							<p class="price">满3件4.5折</p>
							<span class="name">双喜厨房电器清仓专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-20.jpg" alt="">
						<div class="text">
							<p class="price">满49元减6元</p>
							<span class="name">魅逸居家纺上新专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-21.jpg" alt="">
						<div class="text">
							<p class="price">¥19.9-59.9</p>
							<span class="name">天堂雨伞雨具清仓专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-22.jpg" alt="">
						<img src="./images/shopping.png" class="august">
						<div class="text">
							<p class="price">满199元减80元</p>
							<span class="name">睛睬世界美妆推荐专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-23.jpg" alt="">
						<div class="text">
							<p class="price">满3件7.4折</p>
							<span class="name">玛丹曼格女鞋热卖专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-24.jpg" alt="">
						<div class="text">
							<p class="price">满49元减7元</p>
							<span class="name">木槿恩家纺清仓专场</span>
							<span class="days">剩2天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-25.jpg" alt="">
						<div class="text">
							<p class="price">满199元减80元</p>
							<span class="name">邦达楼宁日用家居水杯水壶专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-26.jpg" alt="">
						<div class="text">
							<p class="price">满199元减80元</p>
							<span class="name">如果居家品质专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-27.jpg" alt="">
						<div class="text">
							<p class="price">满199元减80元</p>
							<span class="name">GNB男鞋运动鞋上新专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-28jpg.jpg" alt="">
						<div class="text">
							<p class="price">满3件4折</p>
							<span class="name">索尔诺居家收纳热卖专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-29.jpg" alt="">
						<div class="text">
							<p class="price">满199元减5元</p>
							<span class="name">联科电器专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-30.jpg" alt="">
						<div class="text">
							<p class="price">满99元减20元</p>
							<span class="name">蜗家居家收纳上新专场</span>
							<span class="days">剩2天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-31.jpg" alt="">
						<img src="./images/shopping.png" class="august">
						<div class="text">
							<p class="price">满199元减80元</p>
							<span class="name">溪居家纺上新专场</span>
							<span class="days">剩2天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-32.jpg" alt="">
						<img src="./images/shopping.png" class="august">
						<div class="text">
							<p class="price">满3件7.5折</p>
							<span class="name">百瑞福美食肉类熟食热卖专场</span>
							<span class="days">剩2天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-33.jpg" alt="">
						<img src="./images/shopping.png" class="august">
						<div class="text">
							<p class="price">满59元减8元</p>
							<span class="name">伊诺家纺品质专场</span>
							<span class="days">剩2天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-34.jpg" alt="">
						<img src="./images/shopping.png" class="august">
						<div class="text">
							<p class="price">满99元减20元</p>
							<span class="name">索尔诺居家焕新专场</span>
							<span class="days">剩2天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-35.jpg" alt="">
						<img src="./images/shopping.png" class="august">
						<div class="text">
							<p class="price">¥15-298</p>
							<span class="name">满天礼十字绣上新专场</span>
							<span class="days">剩2天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-36.jpg" alt="">
						<img src="./images/shopping.png" class="august">
						<div class="text">
							<p class="price">满1件8折</p>
							<span class="name">美肤宝护肤热卖专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-37.jpg" alt="">
						<img src="./images/shopping.png" class="august">
						<div class="text">
							<p class="price">满59元减10元</p>
							<span class="name">欧尚博洋家纺开学季专场</span>
							<span class="days">剩3天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-38.jpg" alt="">
						<img src="./images/shopping.png" class="august">
						<div class="text">
							<p class="price">满3件7折</p>
							<span class="name">松鑫电器电器品质专场</span>
							<span class="days">剩2天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-39.jpg" alt="">
						<img src="./images/shopping.png" class="august">
						<div class="text">
							<p class="price">满49元减7元</p>
							<span class="name">目觉家纺上新专场</span>
							<span class="days">剩2天</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/category">
						<img src="./images/content/content-40.jpg" alt="">
						<img src="./images/shopping.png" class="august">
						<div class="text">
							<p class="price">满3件7折</p>
							<span class="name">居家家日用百货日用百货热卖专场</span>
							<span class="days">剩2天</span>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
		<JuPiNav></JuPiNav>
	</div>

</template>

<script type="text/ecmascript-6">
        import imagesLoaded from 'imagesloaded';
        import IScroll from 'iscroll';
	import JuPiNav from '../../components/JuPiNav';
	export default {
		components:{ JuPiNav },
		data() {
		        return {
				display: false,                          //标识 回到顶部 是否显示，默认为不显示
			        isActive: true,                           //标识 文字是否被激活 ，默认激活
		        }
		},
		methods: {
                        // 轮播图的滚动
                        _initBannerScroll() {
		                this.$nextTick(() => {
		                        imagesLoaded(this.$refs.banner, () => {
                                                this.bannerScroll = new IScroll(this.$refs.banner, {
                                                        scrollY: false, //关闭纵向滚动
                                                        scrollX: true, //开启横向滚动
                                                        momentum: false, //关闭惯性滚动
                                                        snap: true //开启轮播图滚动
                                                });
                                                this.bannerScroll.on('scrollStart', () => {
                                                        clearTimeout(this.timer); //停止自动播放
                                                });
                                                this.bannerScroll.on('scrollEnd', () => {
                                                        // 调整整个滚动条的位置， 实现无缝滚动
                                                        let len = 7;
                                                        if (this.bannerScroll.currentPage.pageX === 0) {
                                                                this.bannerScroll.disable(); //调整期间，禁止滚动
                                                                setTimeout(() =>{
                                                                        this.bannerScroll.goToPage(len - 2, 0, 0);
                                                                        this.bannerScroll.enable(); //调整结束，恢复滚动
                                                                }, 10);
                                                        }
                                                        if (this.bannerScroll.currentPage.pageX === len - 1) {
                                                                this.bannerScroll.disable(); //调整期间，禁止滚动
                                                                setTimeout(() =>{
                                                                        this.bannerScroll.goToPage(1, 0, 0);
                                                                        this.bannerScroll.enable(); //调整结束，恢复滚动
                                                                }, 10);
                                                        }
                                                        this.timer = setTimeout(() => this.bannerScroll.next(),3000);
                                                });
                                                this.bannerScroll.goToPage(1,0,0);   //初始化显示第二页（第一张图片片）
                                                this.bannerIndex = 1;                           //记录当前更新时第几张
                                                this.timer = setTimeout(() => this.bannerScroll.next(),3000);//开始自动播放
		                        });
		                });
		        },
			toTop() {
                                let ispeed = Math.floor(-this.scrollTop / 5);
                                document.documentElement.scrollTop = document.body.scrollTop = this.scrollTop + ispeed;
			},
			scrollToTop() {
                                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                                if(scrollTop > 500) {
                                        this.display = true;
                                } else {
                                        this.display = false;
                                }
			}
		},
		created() {
		        this._initBannerScroll();
                        window.addEventListener('scroll',this.scrollToTop);
		},
	};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		padding-bottom: 1rem
		position: relative
		img.goTop
			position: fixed
			top: 11rem
			right: 0.2rem
			z-index: 10
		ul.nav
			position: fixed
			bottom: 0
			left: 0
			width: 100%
			height: 1rem
			background-color: #fff
			border-top: 1px solid #ccc
		.header
			display: flex
			align-items: center
			height: 1rem
			padding: 0 0.2rem
			a.header-left
				flex-grow: 1
				display: flex
				align-items: center
				background-color: #f2f2f2
				height: 0.7rem
				line-height: 0.7rem
				border-radius: 0.2rem
				padding: 0 0.2rem
				position: relative
				outline: none
				img
					width: 0.5rem
					height: 0.5rem
				span
					&.name
						position: absolute
						top: 0.1rem
						left: 0.8rem
						transform: translateY(-15%)
						color: #FF464E
					&.search
						position: absolute
						top: 0.1rem
						left: 1.5rem
						transform: translateY(-15%)
						color: #666
			a.header-right
				img
					flex-shrink: 0
					width: 0.9rem
					height: 0.9rem
		.banner
			overflow: hidden
			padding: 0
			touch-action: pan-x
			margin-bottom: 0.4rem
			position: relative
			ul
				display: flex
				width: 700%
				li
					flex-grow: 1
					font-size: 0
					img
						width: 100%
		.promote
			.promote-top
				ul
					display: flex
					li
						flex-grow: 1
						a
							display: inline-block
							width: 100%
							height: 100%
							img
								width: 1.8rem
								height: 1.6rem
			.promote-center
				width: 100%
				height: 2rem
				img
					width: 100%
					height: 100%
			.promote-bottom
				.promote-bottom-up
					display: flex
					img
						width: 50%
				.promote-bottom-down
					display: flex
					img
						width: 33.3333%
		.praise
			background-color: #f4f4f4
			height: 1.4rem
			position: relative
			img
				position: absolute
				top: 50%
				left: 0
				transform: translateY(-50%)
				width: 100%
				height: 0.95rem
		.content
			.title
				width: 100%
				height: 0.8rem
				line-height: 0.8rem
				box-sizing: border-box
				padding: 0 0.3rem
				span
					font-size: 0.28rem
					padding: 0.2rem
					&.active
						border-bottom: 3px solid #FF464E
						color: #FF464E
			ul
				display: flex
				flex-wrap: wrap
				justify-content: space-between
				li
					width: 49.9%
					margin-bottom: 0.4rem
					a
						display: flex
						flex-direction: column
						position: relative
						img
							width: 100%
							height: 100%
						img.august
							position: absolute
							top: 0
							left: 0
							width: 0.9rem
							height: 0.9rem
						.text
							padding: 0 0.2rem
							display: flex
							flex-wrap: wrap
							p.price
								font-size: 0.28rem
								color: #FF464E
								margin: 0.2rem 0
								width: 100%
							span.name
								display: inline-block
								width: 70%
								font-size: 0.24rem
								text-overflow: ellipsis
								white-space: nowrap
								overflow: hidden
								color: #333
							span.days
								display: inline-block
								width: 30%
								text-align: center
								font-size: 0.24rem
								color: #999

</style>