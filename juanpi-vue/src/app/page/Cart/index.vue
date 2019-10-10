<template>
	<div class="page-wrapper">
		<div class="header">
			<a class="back iconfont icon-back"  @click="$router.back();"></a>
			<h1 class="title">购物车</h1>
			<button class="btn-edit-toggle" :class="{ hide: list.length === 0}" v-text="isEdit ? '完成' : '编辑' " @click="isEdit = !isEdit"></button>
		</div>
		<div class="null" v-if="list.length === 0">
			<img :src="emptyImg" alt="" />
			<p>购物车中还没有商品哦...</p>
			<router-link to="/home">去逛逛</router-link>
		</div>
		<template v-else>
			<div class="content">
				<ul class="cart-list">
					<li v-for="item in list" :key="item.id">
						<span class='iconfont icon-check'  :class="{ checked: item.select1}" v-show="!isEdit" @click="toggleSelect1(item.id)"></span>
						<span class='iconfont icon-check'  :class="{ checked: item.select2}" v-show="isEdit" @click="toggleSelect2(item.id)"></span>
						<router-link :to="`/detail/${ item.id }`">
							<img :src='item.avatar' />
						</router-link>
						<div class='detail clearfix'>
							<h3 class='title' v-text="item.name"></h3>
							<span class='size' >尺寸: {{ item.size }}</span>
							<p class="price">¥{{ item.price }}</p>
							<div class="count-wrapper">
								<JuPiCount
									:count="item.count"
									:decrease="e => decrease({ id: item.id,loadingEl: e.target.parentNode,count: item.count })"
									:increase="e => increase({ id: item.id,loadingEl: e.target.parentNode, count: item.count })">
								</JuPiCount>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="footer footer-normal clearfix" :class="{ hide: isEdit }">
				<div class="footer-wrapper">
					<i class="checkbox  iconfont icon-check" :class="{ checked: allSelect1}" @click="toggleAllSelect1(!allSelect1)"></i>
					<span class="all">全选</span>
				</div>
				<p class="account">合计:￥{{account}}</p>
				<button class="btn-settlement" @click="$router.push('/order')" :class="{ disabled: total1 === 0 }"  :disabled="total1 === 0">去结算<em class="total"  v-show="total1" v-text="`(${total1})`"></em></button>
			</div>
			<div class="footer footer-edit" :class="{ hide: !isEdit }">
				<div class="footer-wrapper">
					<i class="checkbox  iconfont icon-check" :class="{ checked: allSelect2}" @click="toggleAllSelect2(!allSelect2)"></i>
					<span class="all">全选</span>
				</div>
				<button class="btn-delete" @click="remove"  :class="{ disabled: total2 === 0 }"  :disabled="total2 === 0">删除<em class="total"  v-show="total2" v-text="`(${total2})`"></em></button>
			</div>
		</template>

	</div>
</template>

<script type="text/ecmascript-6">
	import emptyImg from './empty-cart.png';

	import JuPiCount from '../../components/JuPiCount';
	import { createNamespacedHelpers } from 'vuex';
	let { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('cart');

	export default {
	        components: { JuPiCount },
		data() {
	                return {
	                        emptyImg,
	                        isEdit: false,                                          //判断是否是编辑状态，默认为 false
	                }
		},
		computed: {
			...mapState(['list']),
			allSelect1() { return this.list.every(item => item.select1 ); },
			allSelect2() { return this.list.every(item => item.select2 ); },
			//reduce 函数的返回值就是最终的结果；  默认的返回结果是 0；上一次的函数返回值会成为下次计算的初始值
			//第一个参数是一个函数，函数的第一个参数是返回结果，第二个参数是迭代的元素；第二个参数是求和的初始值，默认为 0
                        total1() { return this.list.reduce((result,item) => item.select1 ? item.count +result : result , 0); },
                        total2() { return this.list.reduce((result,item) => item.select2 ? item.count +result : result , 0); },
			account() { return this.list.reduce((result,item) => item.select1 ? item.price*item.count + result : result,0)}
		},
		methods: {
			...mapMutations([ 'reset','toggleAllSelect1','toggleAllSelect2','toggleSelect1', 'toggleSelect2']),
			...mapActions(['init','decrease', 'increase','remove']),
		},
		created() {
	                this.init();
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		width: 100%
		height: 100%
		display: flex
		flex-direction: column
		background-color: rgb(243, 243, 243)
		.header
			flex-shrink: 0
			width: 100%
			height: 0.9rem
			display: flex
			background-color: #fff
			box-sizing: border-box
			padding: 0 0.2rem
			*
				line-height: 0.9rem
			a.back
				width: 0.9rem
				color: #333
				font-size: 0.26rem
			h1.title
				flex-grow: 1
				text-align: center
				font-weight: normal
				font-size: 0.3rem
			button.btn-edit-toggle
				width: 0.9rem
				border: none
				outline: none
				font-size: 0.26rem
				background-color: #fff
				&.hide
					visibility: hidden
		.null
			flex-grow: 1
			display: flex
			flex-direction: column
			align-items: center
			justify-content: center
			margin-top: 0.2rem
			p
				font-size: 0.26rem
				color: #666
				padding: 0.26rem 0
			a
				width: 2rem
				height: 0.6rem
				line-height: 0.6rem
				text-align: center
				border-radius: 0.6rem
				font-size: 0.28rem
				border: 3px solid #bb9172
				color: #bb9172
				background-color: #f4f4f4
		.content
			flex-grow: 1
			border-top: 1px solid #ccc
			border-bottom: 1px solid #ccc
			padding: 0 0.2rem
			overflow: auto
			ul
				li
					display: flex
					align-items: center
					padding: 0.32rem 0
					border-bottom: 1px solid #ccc
					background-color: #fff
					margin: 0.2rem 0
					border-radius: 0.2rem
					span
						width: 0.4rem
						height: 0.4rem
						border-radius: 0.2rem
						background-color: white
						color: white
						font-size: 0.4rem
						text-align: center
						line-height: 0.4rem
						border: 1px solid #ccc
						margin-left: 0.2rem
						&.checked
							color: #FF464E
					a
						img
							width: 1.8rem
							height: 1.8rem
							margin: 0 0.3rem
					.detail
						flex-grow: 1
						height: 1.8rem
						position: relative
						span.size
							width: 100%
							text-align: left
							border: none
							background-color: #fff
							color: #333
							font-size: 0.28rem
							margin: 0
						h3
							font-size: 0.28rem
							margin-bottom: 0.2rem
							font-weight: normal
						p
							position: absolute
							bottom: 0
							left: 0
							font-size: 0.32rem
							color: #FF5A61
						.count-wrapper
							float: right
		.footer
			flex-shrink: 0
			display: flex
			align-items: center
			padding: 0 0.2rem
			height: 1rem
			line-height: 1rem
			background-color: white
			&.hide
				display: none
			.footer-wrapper
				flex-grow: 1
				i
					width: 0.4rem
					height: 0.4rem
					border-radius: 0.2rem
					color: white
					font-size: 0.4rem
					text-align: center
					line-height: 0.4rem
					border: 1px solid #ccc
					&.checked
						color: #FF464E
				span.all
					padding: 0 0.2rem
					font-size: 0.26rem
			p.account
				font-size: 0.28rem
				color: #ff464e
			span.icon-cart
				flex-shrink: 0
				font-size: 0.34rem
				padding: 0 0.4rem
			button
				flex-shrink: 0
				width: 2rem
				height: 1rem
				flex-shrink: 0
				border: 1px solid transparent
				background-color: #FF464E
				font-size: 0.36rem
				color: white
				margin-left: 0.3rem
				&.disabled
					border: 1px solid white
					background-color: #999
				em.total
					font-style: normal





</style>