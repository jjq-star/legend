//根组件， 负责渲染当前应该显示的 页面级 组件
<template>
	<div class="root">
		<JuPiLoading></JuPiLoading>
		<!--router-view 组件 是一个要渲染组件的占位符-->
		<!--keep-alive 标签使组件不会被销毁，缓存下来-->
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script type="text/ecmascript-6">
	import JuPiLoading from './components/JuPiLoading/index.vue';
	export default {
		components: { JuPiLoading }
	};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.root
		width: 100%
		height: 100%
</style>
