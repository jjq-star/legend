<template>
	<div class="confirm" @click.self="close">
		<div class="content">
			<img :src="titleImg" >
			<p v-text="text"></p>
			<button @click="ok">确 认</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import titleImg from './icon.png';

        export default {
                data: function() {
                        return {
                                text: '',
	                        resolve: null,
	                        titleImg
                        }
                },
	        methods: {
                        close() {
				this.$destroy(true);
				this.$el.parentNode.removeChild(this.$el);
                        },
		        ok() {
				this.resolve();
				this.close();
		        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.confirm
		position: fixed
		top: 0
		left: 0
		z-index: 80
		width: 100%
		height: 100%
		background-color: rgba(0,0,0,0.5)
		.content
			position: absolute
			top: 50%
			left: 50%
			transform: translate(-50%,-50%)
			background-color: #fff
			min-width: 70%
			max-width: 80%
			border-radius: 0.2rem
			img
				display: block
				margin: 0 auto
				width: 2rem
				margin-top: 0.36rem
			p
				font-size: 0.36rem
				text-align: center
				color: rgb(132,132,132)
				padding: 0.4rem 0.2rem
			button
				display: block
				width: 100%
				padding: 0.26rem 0
				text-align: center
				font-size: 0.32rem
				color: rgb(130,192,208)
				background-color: transparent
				border-top: 1px solid #ccc
</style>