<template>
	<div class="page-wrapper">
		<JuPiPopup :is-show="isFilter" align="top" @close="isFilter = false">
			<div class="filter-wrapper">
				<div class="filter-header">
					<span :class="{ active: orderCol === 'price'}" @click="toggleOrder('price')">
						价格 <i class="iconfont" :class="{ 'icon-sort-up': orderDir ==='ASC', 'icon-sort-down': orderDir === 'DESC' }"></i>
					</span>
					<span :class="{ active: orderCol === 'sale'}" @click="toggleOrder('sale')">
						销量 <i class="iconfont" :class="{ 'icon-sort-up': orderDir ==='ASC', 'icon-sort-down': orderDir === 'DESC' }"></i>
					</span>
					<input type="text" placeholder="请输入商品名称" v-model="name">
					<i class="iconfont icon-search" @click="search"></i>
				</div>
			</div>
		</JuPiPopup>
		<router-link to="/home" class="iconfont icon-home"></router-link>
		<a class="iconfont icon-gotop" @click="toTop" v-show="showGetTop"></a>
		<div class="header">
			<router-link to="/category" class="iconfont icon-back back"></router-link>
			<h1 class="title" v-text="title"></h1>
			<a class="iconfont icon-category-vertical category" v-show="!showListMode" @click="showListMode = true"></a>
			<a class="iconfont icon-category-level category" v-show="showListMode" @click="showListMode = false"></a>
			<a class="sort iconfont icon-select" @click="isFilter = true"></a>
		</div>
		<div class="sub-list">
			<ul>
				<li v-for="item in subList" :key="item.id">
					<router-link v-text="item.name" :to="`/list/${mId}/${item.id}`"></router-link>
				</li>
			</ul>
		</div>
		<div class="content" ref="scroll">
			<div class="content-wrapper">
				<ul class="clearfix" :class="{ list: showListMode, card: !showListMode }">
					<li v-for="item in productList" v-bind:key="item.id">
						<router-link :to= '`/detail/${ item.id}`'>
							<img :src= "item.avatar" :alt= 'item.name' class="avatar" />
							<div class="item-detail clearfix">
								<h3 v-text="item.name" class="ellipsis"></h3>
								<span class="sale">{{item.sale}}次购买</span>
								<span class="price">￥{{ item.price}}</span>
							</div>
						</router-link>
					</li>
				</ul>
				<div class="info">
					<i v-if="isLoading" class="loading"></i>
					<i v-else-if="(!hasMore) && productList.length > 0" class="iconfont icon-bottom"></i>
					<i v-else-if="(!hasMore) && productList.length === 0" class="iconfont icon-bottom"></i>
					<i v-else class="iconfont icon-top"></i>
					<p v-text="tipText"></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';  //并没有映射到任何一个子仓库，而是映射总仓库
	import IScroll from 'iscroll/build/iscroll-probe';
	import imagesLoaded from 'imagesloaded';
	import JuPiPopup from '../../components/JuPiPopup';

	export default {
	        components: { JuPiPopup },

	        data: function() {
	                return {
	                        mId: 0,
		                sId: 0,
		                count: 6,
		                name: '',                                       //标识 搜索的商品名称
		                orderCol: 'price',
		                orderDir: 'DESC',
		                isLoading: false,                               //标识 是否正在请求数据
		                hasMore: true,                                  //标识 是否有更多数据可供加载
		                isTriggerLoadMore: false,               //标识 是否触发了加载更多
		                showListMode: false,                     //标识 当前列表的展示方式
		                showGetTop: false,                      //标识 是否到达顶部
		                isFilter: false,                                //标识 是否为 筛选状态，默认不是筛选
		                show: false,
	                };
	        },
		// 计算属性
		computed:  {
                        //映射过来的 计算属性
                        ...mapState('category', { categoryList: 'list'}),
                        ...mapGetters('category',['subList']),
			...mapState('product', { productList: 'list'}),
	                //自定义的  计算属性(求 标题名 ）
			title: function() {
                                let target =  this.categoryList.find(item => item.id === this.mId);    //总有真空期会找不到，需要进行判断
				return target ? target.name : '';
			},
			tipText: function() {
                                if(this.isLoading) return '加载中...';
                                if(!this.hasMore) return this.productList.length > 0 ? '已到达底部..' : '暂无相关数据，敬请期待';
                                return '上拉加载...';
			}
		},
		methods: {
			...mapActions('category',['init', 'toggleId']),
			...mapActions('product',['getData']),
			_getAjaxData(loadMore) {
			        return {
					cid: this.sId,
				        name: this.name,                                                //搜索商品的名字
				        start: loadMore ? this.productList.length : 0 ,
				        count: this.count,
				        orderDir: this.orderDir,
				        orderCol: this.orderCol
			        }
			},
			_getProductData(loadMore = false) {                     //通知仓库请求数据
                                if(!loadMore) this.showGetTop = false;
				this.isLoading = true;
				this.getData(this._getAjaxData(loadMore))
					.then( length => {
						this.isLoading = false;
						this.hasMore = length === this.count ? true : false;
					});
			},
			_initOrRefreshScroll() {                        //创建/更新滚动对象
				imagesLoaded(this.$refs.scroll, () => {
				        this.$nextTick(() => {
				                if(this.scroll) this.scroll.refresh();
				                else {
				                        this.scroll = new IScroll(this.$refs.scroll, {          ////第一个参数是托管对象，第二个参数是一个函数
				                                click: true,
					                        probeType: 3,
					                        bounce: false,                  //关闭边界回弹，因为惯性滚动会触发边界回弹，影响用户体验
					                        deceleration: 0.03              //滚动阻尼系数
				                        });
				                        this.scroll.on('scroll', () => {
				                                if(this.hasMore && (!this.isLoading) && (!this.isTriggerLoadMore) ) {
				                                        this.isTriggerLoadMore = this.scroll.y < 0 && this.scroll.maxScrollY === this.scroll.y;
				                                }
				                        });
				                        this.scroll.on('scrollEnd', () => {
				                                if(this.scroll.y === 0) this.showGetTop =false;
                                                                if(this.scroll.y < 0 && !this.showGetTop) this.showGetTop = true;
                                                                if(this.isTriggerLoadMore) {
                                                                        this.isTriggerLoadMore = false;
                                                                        this._getProductData(true);
                                                                }
				                        });
				                }
				        })
				});
			},
			isShow() {
			        this.show = !this.show;
			},
			toggleOrder(orderCol) {
			        if(this.isLoading) { this.$notice('操作过于频繁'); return; }
			        if(orderCol === this.orderCol) this.orderDir = this.orderDir === 'DESC' ? 'ASC' : 'DESC';
			        else this.orderCol = orderCol;
			        this.isFilter = false;
			},
			search() {
			        this._getProductData();
			        this.name = '';
			        this.isFilter = false;
			},
			toTop: function() {
			        this.scroll.scrollTo(0,0,300);
			}
		},
		watch: {
	                sId: function(newValue, oldValue) {//sId 值 发生变化时，就该请求列表数据
				this._getProductData();
	                },
                        productList: function(newValue, oldValue) {
                                this.$nextTick(() => this._initOrRefreshScroll());
                        },
			showListMode: function(newValue, oldValue) {
	                        if(this.scroll) this.scroll.scrollTo(0,0,300);
	                        this.showGetTop = false;
                                this.$nextTick(() => this._initOrRefreshScroll());
			},
                        orderCol: function(newValue, oldValue) { this._getProductData(); },
                        orderDir: function(newValue,oldValue) { this._getProductData(); },
		},
	        created: function() {
			this.init().then(() => this.toggleId(parseInt(this.$route.params.mId)));        //直接访问列表页在访问分类页时， 对应的一级分类的id 会被选中
	        },
		activated: function() {
                        this.mId = parseInt(this.$route.params.mId);
                        this.sId = parseInt(this.$route.params.sId);
		},
		destroyed: function() {
	                if(this.scroll) this.scroll.destroy();
		},
		//组件路由守卫
		beforeRouteUpdate(to, from, next) {
			if(to.params.sId !== from.params.sId) {
                                if(this.isLoading) {
                                        this.$notice('你的操作太频繁了');
                                        return;
                                }
                                this.sId = parseInt(to.params.sId);
                                next();
			}
		},
	};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.filter-wrapper
		padding: 0.3rem 0.2rem 1rem
		.filter-header
			display: flex
			align-items: center
			height: 1rem
			i.iconfont
				font-size: 0.36rem
			span
				display: flex
				align-items: center
				margin-right: 0.1rem
				font-size: 0.26rem
				&.active
					color: #ff464e
				i
					margin-left: -0.01rem
			input
				height: 0.7rem
				flex-grow: 1
				margin: 0 0.2rem
				font-size: 0.24rem
				text-align: left
				text-indent: 1em
				border: none
				outline: none
				border-bottom: 1px solid #b0b0b0
			i.icon-search
				width: 1rem
				font-size: 0.36rem
	.page-wrapper
		width: 100%
		height: 100%
		display: flex
		flex-direction: column
		position: relative
		a.icon-home,a.icon-gotop
			position: fixed
			right: 0.2rem
			z-index: 100
			box-sizing: border-box
			width: 0.84rem
			height: 0.84rem
			text-align: center
			line-height: 0.84rem
			font-size: 0.44rem
			border-radius: 50%
			font-weight: bold
		a.icon-home
			bottom: 0.2rem
			background-color: rgba(0,0,0,0.3)
			color: #fff
		a.icon-gotop
			bottom: 1.24rem
			boeder: 1px solid #b0b0b0
			background-color: rgba(200,200,200,0.7)
			color: #666
		.header
			display: flex
			flex-shrink: 0
			height: 0.8rem
			border-bottom: 1px solid #999
			padding: 0 0.2rem
			*
				line-height: 0.8rem
				text-align: center
				font-size: 0.3rem
			a.back
				flex-shrink: 0
				font-size: 0.3rem
			h1.title
				flex-grow: 1
				font-weight: normal
				font-size: 0.34rem
			a.category
				font-size: 0.4rem
				padding: 0 0.2rem
			a.sort
				font-size: 0.4rem
			button
				background-color: transparent
				font-size: 0.4rem
				color: #333
		.sub-list
			flex-shrink: 0
			overflow: auto
			border-bottom: 5px solid #ccc
			ul
				display: flex
				padding: 0.2rem 0 0.1rem
				li
					flex-shrink: 0
					padding: 0 0.2rem
					a
						outline: none
						color: #333
						font-size: 0.28rem
						&.router-link-active
							color: #ff464e
							padding: 0.2rem 0 0.1rem
							border-bottom: 5px solid #ff464e
		.content
			flex-grow: 1
			overflow:hidden
			padding: 0.2rem
			background-color: #fff
			.content-wrapper
				overflow: hidden
				touch-action: pan-y
				ul.card
					display: flex
					flex-wrap: wrap
					li
						width: 50%
						margin-bottom: 0.2rem
						a
							display: inline-block
							width: 100%
							height: 100%
							text-align: center
							img
								width: 98%
							.item-detail
								text-align: left
								padding: 0 0.15rem
								h3
									font-weight: normal
									font-size: 0.3rem
									margin-bottom: 0.15rem
								span.price
									float: left
									font-size: 0.26rem
									color: #ff464e
								span.sale
									float: right
									font-size: 0.26rem
									color: #999
				ul.list
					li
						width: 100%
						margin-bottom: 0.2rem
						a
							display: flex
							width: 100%
							height: 100%
							text-align: center
							img
								flex-shrink: 0
								width: 3.5rem
								height: 3.5rem
							.item-detail
								flex-direction: column
								flex-grow: 1
								text-align: left
								box-sizing: border-box
								padding: 0.6rem 0.4rem
								h3
									font-weight: normal
									font-size: 0.3rem
									padding: 0.1rem 0
									margin-bottom: 0.8rem
								span.price
									float: left
									font-size: 0.26rem
									color: #ff464e
									padding: 0.1rem 0
								span.sale
									float: right
									font-size: 0.26rem
									color: #999
									padding: 0.1rem 0
				.info
					height: 1rem
					display: flex
					justify-content center
					align-items: center
					color: #666
					i
						font-size: 0.3rem
						margin-right: 0.1rem
						color: #333
						&.loading
							background-image: url(./loading.gif)
							width: 0.3rem
							height: 0.3rem
							background-position: center center
							background-size: 130% 130%
</style>