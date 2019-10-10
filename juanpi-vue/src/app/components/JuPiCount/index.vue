<template>
	<div class="jupi-count">
		<button class="iconfont icon-decrease" :class="{ disabled: count === 1 }"  @click="decrease"></button>
		<span class="count" v-text="count"></span>
		<button class="iconfont icon-increase" :class="{ disabled: count === 10 }"  @click="increase"></button>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                props: {
                        count: Number,
	                decrease: Function,
	                increase: Function
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	span,button
		display: inline-block
		width: 0.4rem
		height: 0.4rem
		line-height: 0.4rem
		text-align: center
		font-size: 0.26rem
		background-color: white
		&.disabled
			color: #b0b0b0
		&.count
			background-color: rgb(244,244,244)
</style>