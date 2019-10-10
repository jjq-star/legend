<template>
	<div class="loading" v-show="$store.state.loading.isShow">
		<img :src="Gif" alt="">
	</div>
</template>

<script type="text/ecmascript-6">
	import Gif from './002.gif';

        export default {
                data() {
                        return {
                                Gif,
                        }
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.loading
		position:fixed
		top: 0
		left: 0
		z-index: 10
		width: 100%
		height: 100%
		background-color: white
		p
			font-size: 0.5rem
			color: black
			font-weight: 500
			position: absolute
			top: 50%
			left: 50%
			transform: translate(-50%,-50%)
		img
			width: 40%
			position: absolute
			top: 50%
			left: 50%
			transform: translate(-50%,-50%)
</style>