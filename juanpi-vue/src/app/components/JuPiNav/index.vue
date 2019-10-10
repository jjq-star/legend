<template>
	<ul class="nav">
		<li>
			<router-link to="/home">
				<i class="iconfont icon-home"></i>
				<span class="">首页</span>
			</router-link>
		</li>
		<li>
			<router-link to="/category">
				<i class="iconfont icon-category-vertical"></i>
				<span class="">分类</span>
			</router-link>
		</li>
		<li>
			<router-link to="/cart">
				<i class="iconfont icon-cart"></i>
				<span class="">购物车</span>
			</router-link>
		</li>
		<li>
			<router-link to="/profile">
				<i class="iconfont icon-user"></i>
				<span class="">我的卷皮</span>
			</router-link>
		</li>
	</ul>
</template>

<script type="text/ecmascript-6">
	export default{

	};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	ul
		height: 1rem
		display: flex
		li
			flex-grow: 1
			flex-basis: 0
			a
				display: flex
				height: 100%
				flex-direction: column
				align-items: center
				justify-content: center
				&.router-link-active>i,
				&.router-link-active>span
					color: #ff464e
				i
					font-size: 0.4rem
					color: #ccc

				span
					color: #333
					margin-top: 0.1rem

</style>