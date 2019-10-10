<template>
	<button @click="click">{{ value }}</button>
</template>

<script type="text/ecmascript-6">
        export default {
		props: {
		        value: {
		                type: String,
			        default: '确认'
		        },
			click: Function
		}
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	button
		diaplay: block
		width: 100%
		height: 0.7rem
		line-height: 0.7rem
		font-size: 0.28rem
		color: #fff
		background-color: #dbdbdb
		border-radius: 0.35rem
		border: none
		outline: none
		margin: 0.5rem 0 0.2rem
		box-shadow: 0px 4px 2px #f1eadf
		&.active
			background-color: #ff464e
</style>