<template>
	<p v-text="text" class="notice"></p>
</template>

<script type="text/ecmascript-6">
        export default {
                data: function() {
                        return {
                                text: ''
                        };
                },
	        //挂载后
	        mounted: function() {
                        setTimeout(() => {
                                this.$destroy(true);                                            //销毁组件对象
                                this.$el.parentNode.removeChild(this.$el);      //销毁组件对应的 dom
                        },2000)
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	p.notice
		position: fixed
		top: 50%
		left: 50%
		z-index: 1000
		transform: translate(-50%,-50%)
		background-color: #ff464e
		color: #fff
		font-size: 0.28rem
		padding: 0.1rem 0.2rem
		border-radius: 0.08rem

</style>