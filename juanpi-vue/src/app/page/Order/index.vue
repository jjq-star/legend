<template>
	<div class="page-wrapper">
		<div class="header">
			<h1 class="title">订单确认</h1>
			<router-link class="iconfont icon-home" to="/home" replace></router-link>
		</div>
		<div class="content">
			<h2>收货地址:</h2>
			<div class="receive-address" @click="$router.push({ path: 'address', query: { referer: '/order' }})">
				<p v-if="addressId === 0">没有可用的地址，请创建</p>
				<template v-else>
					<span>姓名: {{ address.receiveName }}</span>
					<span>手机号: {{ address.receiveTel }}</span>
					<span>地址: {{ address.receiveAddress}} {{ address.receiveAddressDetail }}</span>
					<i class="iconfont icon-goright"></i>
				</template>
			</div>
			<h2>订单详情:</h2>
			<ul class="buy-list">
				<li v-for="item in buyList" :key="item.id">
					<div class="avatar-wrapper">
						<img :src='item.avatar' />
					</div>
					<div class='product-info clearfix'>
						<h3 class='title' v-text="item.name"></h3>
						<p class='size' >尺寸: {{ item.size }}</p>
						<p class="price">¥{{ item.price }}</p>
						<p class="count">x {{ item.count }}</p>
					</div>
				</li>
			</ul>
			<div class="service">
				<ul>
					<li class="clearfix">配送方式 <span>普通配送</span></li>
					<li class="clearfix">使用优惠券 <span>暂无优惠券</span></li>
					<li class="clearfix">运费险 <span>卖家赠送,退换货可赔</span></li>
					<li class="clearfix">订单备注 <span>选填,请先和商家协商一致</span></li>
				</ul>
			</div>
		</div>
		<div class="footer">
			<span>总价:￥{{ account }}</span>
			<button @click="finish">确 定</button>
		</div>
	</div>

</template>

<script type="text/ecmascript-6">
	import { mapState, mapActions } from 'vuex'

	export default {
	        data() {
	                return {
	                        addressId: 0,                           //表示没有被选中的地址
	                }
	        },
		computed: {
			...mapState('cart',['list']),
			buyList() { return this.list.filter(item => item.select1); },
			account() { return this.buyList.reduce((sum,item) => sum + item.price * item.count,0); },
			address() { return this.$store.state.address.list.find(item => item.id === this.addressId ); },
		},
		methods: {
			...mapActions('cart', ['settlement']),
                        ...mapActions('address', ['init']),
			finish() {
			        if(this.addressId === 0) this.$alert('没有可用的地址');
			        else this.settlement(this.addressId).then(() => {
			                this.$router.replace('./pay');
			        });
			}
		},
		created() {
	                if(this.$route.query.addressId) this.addressId = parseInt(this.$route.query.addressId);
			else this.init().then(() => {
	                        let defaultAddress = this.$store.state.address.list.find(item => item.isDefault);
	                        this.addressId = defaultAddress ? defaultAddress.id : 0;
	                });

		},
		//组件内的路由守卫
		beforeRouteEnter(to,from,next) {
	                if(from.path === '/cart') next();
	                else if(from.path === '/address' && to.query.addressId ) next();
	                else next('/home');
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		display: flex
		flex-direction: column
		width: 100%
		height: 100%
		background-color: #f4f4f8
		.header
			flex-shrink: 0
			height: 0.8rem
			line-height: 0.8rem
			padding: 0 0.2rem
			background-color: #fff
			position: relative
			h1.title
				font-size: 0.3rem
				font-weight: normal
				text-align: center
				letter-spacing: 0.1rem
			a
				position: absolute
				right: 0.2rem
				top: 0
				font-size: 0.34rem
		.content
			flex-grow: 1
			h2
				padding: 0.1rem 0.2rem
				font-weight: normal
				letter-spacing: 0.1rem
			.receive-address
				background-color: rgba(0,0,0,0.5)
				padding: 0.2rem 0.2rem
				position: relative
				*
					color: #fff
				span
					display: block
					padding: 0.1rem 0
					font-size: 0.26rem
				i
					position: absolute
					right: 0.2rem
					bottom: 1rem
					font-size: 0.28rem
			ul.buy-list
				overflow: outo
				li
					display: flex
					align-items: center
					border-top: 1px solid #ccc
					border-bottom: 1px solid #ccc
					padding: 0.4rem 0
					margin-bottom: 0.2rem
					background-color: #fff
					border-radius: 0.2rem
					.avatar-wrapper
						flex-shrink: 0
						display: flex
						justify-content: center
						width: 1.8rem
						height: 1.8rem
						margin: 0 0.2rem
						border-radius: 0.06rem
						background-color: rgba(0,0,0,0.05)
						img
							width: 100%
					.product-info
						flex-grow: 1
						height: 1.6rem
						padding: 0 0.2rem
						h3
							color: black
							font-weight: normal
							font-size: 0.32rem
						p
							font-size: 0.28rem
							padding: 0.1rem 0
							&.size
								color: #666
							&.price
								color: #bf1111
								float: left
							&.count
								float: right
			.service
				background-color: white
				padding: 0.2rem
				border-radius: 0.2rem
				ul
					li
						padding: 0.1rem 0
						span
							color: #999
							float: right
		.footer
			flex-shrink: 0
			height: 1rem
			display: flex
			justify-content: space-between
			align-items: center
			padding: 0 0.2rem
			background-color: #fff
			span
				color: #ff464e
				font-size: 0.32rem
			button
				height: 0.6rem
				border-radius: 0.3rem
				font-size: 0.26rem
				background-color: #ff464e
				padding: 0 0.4rem
				color: white

</style>