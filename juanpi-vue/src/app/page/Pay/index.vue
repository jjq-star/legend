<template>
	<div class="page-wrapper">
		<div class="header">
			<h1>付 款</h1>
		</div>
		<div class="content">
			<h2>支付方式</h2>
			<ul>
				<li>
					<img src="./icon_ali.png" alt="">
					<span>支付宝支付</span>
					<i class="iconfont icon-check" :class=" isChecked ? 'check' : ''" @click="isChecked = !isChecked"></i>
				</li>
				<li>
					<img src="./icon_wx.png" alt="">
					<span>微信支付</span>
					<i class="iconfont icon-check"  :class=" isChecked ? '' : 'check'" @click="isChecked = !isChecked"></i>
				</li>
			</ul>
		</div>
		<div class="pay-ways">
			<img v-if="isChecked" src="./api.png" alt="">
			<img v-else src="./weixin.png" alt="">
		</div>
		<div class="footer">
			<p>下单时间: {{ orderTime }}</p>
			<p>支付方式: {{ isChecked ? '支付宝' : '微信'}}</p>
			<p>支付单号: {{ orderId }}</p>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { mapState } from 'vuex';

        export default {
                data() {
                        return {
                                isChecked: true,                         //默认选中
                        }
                },
	        computed: {
                        ...mapState('cart',['orderId','orderTime'])
	        },
	        methods: {
                        success() {
                                setTimeout(() => {
                                        this.$router.replace('/cart');
                                },5000)
                        }
	        },
	        created() {
                        this.success();
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		display: flex
		flex-direction: column
		width: 100%
		height: 100%
		background-color: #f4f4f4
		*
			background-color: white
		.header
			flex-shrink: 0
			height: 0.8rem
			line-height: 0.8rem
			padding: 0 0.2rem
			position: relative
			a
				position: absolute
				top: 0.4rem
				right: 0.2rem
				transform: translate(0, -50%)
				font-size: 0.3rem
			h1
				font-weight: normal
				text-align: center
				font-size: 0.34rem


		.content
			padding: 0.2rem
			border-top: 1px solid #ccc
			border-bottom: 1px solid #ccc
			margin: 0.2rem 0
			h2
				border-bottom: 1px solid #ccc
				padding-bottom: 0.2rem
				font-weight: normal
				font-size: 0.28rem
			ul
				li
					padding: 0.2rem 0
					display: flex
					align-items: center
					img
						flex-shrink: 0
						margin-right: 0.2rem
					span
						flex-grow: 1
						font-size: 0.26rem
						padding: 0 0.2rem
					i
						flex-shrink: 0
						font-size: 0.29rem
						color: #fff
						border: 1px solid #ccc
						border-radius: 0.15rem
						&.check
							color: #ff464e
							border: 1px solid transparent
		.pay-ways
			width: 100%
			flex-grow: 1
			position: relative
			img
				position: absolute
				top: 50%
				left: 50%
				transform: translate(-50%,-50%)
				width: 80%
				height: 80%
		.footer
			padding: 0.2rem
			background-color: #f4f4f4
			p
				padding: 0.1rem 0.1rem
				font-size: 0.28rem
				border-bottom: 2px solid #ccc
</style>