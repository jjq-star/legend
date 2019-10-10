<template>
	<div class="mi-input">
		<!--子传父，，通过发射事件-->
		<input :type="type" :placeholder="placeholder" @change="value => account = value" @input="e => $emit('change', e.target.value)">
	</div>

</template>

<script type="text/ecmascript-6">
        export default {
                //父传子
	        props: {
	                type: {
	                        type: String,
		                default: 'text'
	                },
		        placeholder: {
	                        type: String,
			        default: '请输入...'
		        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.mi-input
		text-align: center
		border-bottom: 1px solid #ccc
		padding: 0.1rem 0
		input
			width: 90%
			height: 0.8rem
			border: none
			outline: none
			font-size: 0.24rem
			&::-webkit-input-placeholde
				color: rgb(0,0,0)
</style>