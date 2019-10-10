<template>
	<div class="page-wrapper">
		<div class="header">
			<a class="iconfont icon-back" v-show="isEdit" @click="isEdit = false"></a>
			<a class="back iconfont icon-back" v-show="!isEdit" @click="$router.back()"></a>
			<h1 class="title" v-if="!isEdit">收货地址</h1>
			<h1 class="title" v-else-if="isAdd">新增地址</h1>
			<h1 class="title" v-else>编辑地址</h1>
			<button class="btn-delete iconfont icon-remove" :class="{ show: isEdit && !isAdd}" @click="removeAddressHandler">删除</button>
		</div>

		<div class="content address-list" v-show="!isEdit">
			<div class="content address-null" v-if="$store.state.address.list.length === 0">
				<div class="null">
					<img src="./address.png" alt="">
					<p>您还没有收货地址，请点击下方 + 添加地址</p>
				</div>
			</div>
			<ul v-else>
				<li v-for="item in list" :key="item.id" @click="backOrder(item.id)">
					<p class='name' v-text="item.receiveName"></p>
					<p class='phone' v-text="item.receiveTel"></p>
					<p class='address ellipsis'>{{ item.receiveAddress }} {{ item.receiveAddressDetail }}</p>
					<a class='btn-default' :class='{ default: item.isDefault === 1}' v-text="item.isDefault === 1 ? '默认地址' : '设置为默认地址'" @click.stop="setDefaultHandle(item)"></a>
					<i class='iconfont icon-edit btn-update' @click.stop="beginEdit(false,item)"></i>
				</li>
			</ul>
			<button class="btn-add" @click="beginEdit(true)">+ 添加地址</button>
		</div>
		<div class="content address-edit" v-if="isEdit ">
			<form>
				<ul>
					<li>
						<label for="name">收货人姓名</label>
						<input id="name"  placeholder="请输入姓名" v-model="model.receiveName" @blur="checkName"/>
					</li>
					<li>
						<label for="tel">手机号码</label>
						<input id="tel"  placeholder="请输入手机号" v-model="model.receiveTel" @blur="checkPhone" />
					</li>
					<li class="region" @click="showRegions = true">
						<label for="">所在地区</label>
						<input readonly="readonly" id="" v-model="model.receiveAddress" />
						<i class="iconfont icon-arrow-down"></i>
					</li>
					<li>
						<label for="street">街道地址</label>
						<input id="street"  placeholder="请输入街道地址"v-model="model.receiveAddressDetail" />
					</li>
				</ul>
			</form>
			<button type="button" class="btn-edit btn-save" @click="saveAddressHandle">保存并使用</button>
		</div>
		<JuPiPopup :is-show="showRegions" @close="showRegions = false">
			<JuPiRegion :working="showRegions" @ok="result => { model.receiveAddress = result; showRegions = false; }"></JuPiRegion>
		</JuPiPopup>
	</div>
</template>

<script type="text/ecmascript-6">
        import Vue from 'vue';
	import { createNamespacedHelpers } from 'vuex';
	import JuPiPopup from '../../components/JuPiPopup';
	import JuPiRegion from '../../components/JuPiRegion';

	let { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('address');

	export default {
	        components: { JuPiPopup,JuPiRegion },

	        data() {
	                return {
	                        isEdit: false,                                                  //标识 是否为编辑状态，默认为 不是编辑
		                isAdd: false,                                                   // 标识 编辑状态下的 新增操作还是 修改操作， 默认为 新增状态
	                        model: { id: 0, receiveName: '', receiveTel: '', receiveAddress: '', receiveAddressDetail: ''},
	                        showRegions: false
	                };
	        },
		computed: {
			...mapState(['list'])
		},
		methods: {
			...mapActions(['init','setDefault','removeAddress','addAddress','updateAddress']),
			setDefaultHandle(item) {
			        if(item.isDefault) return;
				else this.setDefault(item.id);
			},
			beginEdit(isAdd, model = {}) {
                                this.isEdit = true;
                                this.isAdd = isAdd;
				if(isAdd) {
				        this.model = { id: 0, receiveName: '', receiveTel: '', receiveAddress: '', receiveAddressDetail: ''};
				} else {
				        this.model =Object.assign({},model);
				}

			},
			removeAddressHandler() {
				if(this.list.length > 1 && this.model.isDefault === 1) {
				        this.$alert('默认地址不能被删除');
				        return;
				}
				this.$confirm('确认删除?')
					.then(() => this.removeAddress(this.model.id))
					.then(() => {
				                this.isEdit = false;
				                this.$alert('删除成功');
					})
			},
			saveAddressHandle() {
			        if(this.isAdd) {
			                this.addAddress(this.model).then(() => this.isEdit = false);
			        } else {
			                this.updateAddress(this.model).then(() => this.isEdit = false);
			        }
			},
                        checkPhone() {
                                let phone = this.model.receiveTel;
                                if(!(/^1[3456789]\d{9}$/.test(phone))){
                                        Vue.prototype.$alert('请确认手机号码是否有误');
                                        return false;
                                }
                        },
			checkName() {
			        if(this.model.receiveName === '') {
                                        Vue.prototype.$alert('收货人姓名不能为空！');
                                        return false;
			        }
			},
			backOrder(addressId) {
			        if(this.$route.query.referer) this.$router.replace({ path: '/order',query: { addressId } });
			},
		},
		created() {
	                this.init();
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		display: flex
		flex-direction: column
		width: 100%
		height: 100%
		.header
			flex-shrink: 0
			display: flex
			align-items: center
			height: 0.8rem
			background-color: white
			border-bottom: 3px solid #ccc
			box-sizing: border-box
			padding: 0 0.2rem
			a
				width: 0.8rem
				flex-shrink: 0
				font-size: 0.3rem
				outline: none
				color: #333
			h1.title
				flex-grow: 1
				font-weight: normal
				text-align: center
				font-size: 0.3rem
			button.btn-delete
				flex-shrink: 0
				width: 0.8rem
				border: 0
				outline: none
				background-color: #fff
				font-size: 0.28rem
				visibility hidden
				&.show
					visibility visible
		.content
			flex-grow: 1
			display: flex
			flex-direction: column
			justify-content: space-between
			box-sizing: border-box
			background-color: rgb(246, 246, 246)
			&.address-null
				padding: 0.8rem 0
				.null
					margin: 0 auto
					text-align: center
					p
						font-size: 0.28rem
						padding: 0.2rem 0
					button.btn-add
						width: 60%
						height: 0.8rem
						font-size: 0.28rem
						color: #ff464e
						border: 1px solid #ff464e;
						background-color: transparent
						margin-top: 0.3rem
			&.address-list
				button.btn-add
					margin: 0.3rem
					border: 1px solid #ff464e
					color: #ff464e
					border-radius: 0.08rem
					height: 0.88rem
					line-height: 0.88rem
					font-size: 0.36rem
					background-color: white
				ul
					flex-grow: 1
					li
						border-bottom: 1px solid #ccc
						box-sizing: border-box
						padding: 0.2rem 0.3rem
						display: flex
						justify-content: space-between
						align-items: center
						flex-wrap: wrap
						height: 2rem
						p
							width: 50%
							font-size: 0.24rem
							&.phone
								text-align: right
							&.address
								width: 100%
								font-size: 0.26rem
								margin: 0.1rem 0
								color: #666
						a.btn-default
							border: 1px solid #ccc
							color: #3DB4E7
							height: 0.3rem
							padding: 0.1rem
							border-radius: 0.08rem
							&.default
								border: 1px solid #b60909
								color: #b60909
								border-radius: 0.08rem
						i
							font-size: 0.3rem
			&.address-edit
				button.btn-save
					margin: 0.3rem
					border: 1px solid #ff464e
					color: #ff464e
					border-radius: 0.08rem
					height: 0.88rem
					line-height: 0.88rem
					font-size: 0.36rem
					background-color: white
				form
					width:100%
					background-color: #fff
					ul
						padding: 0 0.3rem
						li
							border-top: 1px solid #b0b0b0
							margin-top: -1px
							height: 1rem
							display: flex
							align-items: center
							&>*
								height: 0.95rem;
								line-height: 0.95rem
							label
								width: 1.6rem
								flex-shrink: 0
							input
								flex-grow: 1
								border: none
								outline: none
								font-size: 0.24rem
							&.region>i
								font-size: 0.4rem

</style>