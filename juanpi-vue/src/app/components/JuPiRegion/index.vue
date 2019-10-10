<template>
	<div class="mi-region">
		<p v-text="result"></p>
		<button @click="reset">重选</button>
		<!--省列表-->
		<ul v-show="stage === 1">
			<li v-for="(item,i) in provinces" :key="i" v-text="item" @click="region.province = item; stage = 2; result = item;" ></li>
		</ul>
		<!--市列表-->
		<ul v-show="stage === 2">
			<li v-for="(item,i) in cities" :key="i" v-text="item" @click="region.city = item; stage = 3; result = result + ' - ' + item;"></li>
		</ul>
		<!--区列表-->
		<ul v-show="stage === 3">
			<li v-for="(item,i) in areas" :key="i" v-text="item" @click="region.area = item; stage = 4; result = result + ' - ' + item;"></li>
		</ul>
		<!--街道列表-->
		<ul v-show="stage === 4">
			<li v-for="(item,i) in streets" :key="i" v-text="item" @click="result = result + ' - ' + item; $emit('ok',result);" ></li>
		</ul>
	</div>
</template>

<script type="text/ecmascript-6">
	import regions from './regions.js';

        export default {
                props: ['working'],
                data() {
                        return {
                                regions,
	                        region: { province: '', city: '', area: '', street: '' },
	                        stage: 1,                               //标识当前处于地址的哪个阶段； 1 表示省； 2 表示 市； 3 表示 区； 4 表示街道
                                result: '- 请选择 -',                            //p 标签选中的文本
                        };
                },
	        computed: {
                        //所有省的名字
                        provinces() { return this.regions.map(item => item.name); },
	                //当前选中的省对象
		        province() { return this.regions.find(item => item.name === this.region.province ); },
	                // 当前选中省的所有城市的名字
		        cities() { return this.province ? this.province.childs.map(item => item.name) : []; },
		        //当前选中的 城市对象
		        city() { return this.province ? this.province.childs.find(item => item.name === this.region.city) : null ;},
			//当前选中城市的 所有地区的名字
		        areas() { return this.city ? this.city.childs.map(item => item.name) : []; },
		        //当前选中的 地区对象
		        area() { return this.city ? this.city.childs.find(item => item.name === this.region.area) : null; },
		        //当前选中的地区 的所有街道的名字
		        streets() { return this.area ? this.area.childs.map(item => item.name) : []; },
		        //当前选中的街道对象（没有意义，因为已经没有下一级了）

	        },
	        watch: {
                        'region.province' : function(newValue) { this.region.city = this.province.childs[0].name },
		        'region.city': function(newValue) {this.region.area = this.city.childs[0].name },
		        'region.area': function(newValue) {this.region.street = this.area.childs[0].name },
	                working(newValue,oldValue) { if(!newValue) this.reset();}
	        },
	        created() { this.region.province = this.regions[0].name; },
	        methods: {
                        reset() {
                                this.stage = 1;
                                this.region.province = this.regions[0].name;
                                this.result = '- 请选择 -';
                        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.mi-region
		position: relative
		p
			color: #bf1111
			padding: 0 0.2rem
			height: 0.8rem
			line-height: 0.8rem
		button
			position: absolute
			top: 50%
			right: 0
			transform: translateY(-50%)
			width: 0.6rem
			height: 0.6rem
			border-radius: 50%
			font-size: 0.2rem
			color: #fff
			background-color: rgba(0,0,0,0.6)
		ul
			overflow: auto
			height: 4.8rem
			border-top: 1px solid #b0b0b0
			li
				box-sizing: border-box
				height: 0.8rem
				line-height: 0.8rem
				padding: 0 0.2rem
				color: #323232
				font-size: 0.26rem
				border-bottom: 1px solid #b0b0b0
</style>