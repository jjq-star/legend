<template>
	<div class="alert">
		<div class="content">
			<img :src="Img" >
			<p v-text="text"></p>
			<button @click="close">确 定</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Img from './icon.png';

        export default {
                data() {
                        return {
                                text: '',
	                        Img
                        };
                },
	        methods:  {
                        close() {
                                this.$destroy(true);
                                this.$el.parentNode.removeChild(this.$el);
		        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.alert
		position: fixed
		top: 0
		left: 0
		z-index: 900
		width: 100%
		height: 100%
		background-color: rgba(0,0,0,0.5)
		.content
			position: absolute
			top: 50%
			left: 50%
			transform: translate(-50%,-50%)
			text-align: center
			background-color: #fff
			min-width: 70%
			max-width: 80%
			border-radius: 0.04rem
			box-sizing: border-box
			padding-top: 0.2rem
			img
				padding: 0
			p
				text-indent: 0.2rem
				margin: 0.2rem 0
				color: #666
				font-size: 0.28rem
			button
				display: block
				margin: 0 auto
				width: 100%
				background: linear-gradient(150deg,#ff5a61 50%,#fd631c)
				color: #fff
				padding: 0.2rem 0.3rem
				font-size: 0.24rem
				border-radius: 0.1rem 0.1rem 0 0
</style>