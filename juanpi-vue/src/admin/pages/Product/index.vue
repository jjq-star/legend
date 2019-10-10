<template>
	<div class="page-wrapper">
		<div class="search-wrapper">
			<el-form inline>
				<el-form-item label="商品名称:">
					<el-input v-model="search.name"></el-input>
				</el-form-item>
				<el-form-item label="商品分类:">
					<el-select v-model="search.mId">
						<el-option :value="0" label="- 请选择 -"></el-option>
						<el-option v-for="item in mainList" :key="item.id" :value="item.id" :label="item.name"></el-option>
					</el-select >
					-
					<el-select v-model="search.sId">
						<el-option :value="0" label="- 请选择 -"></el-option>
						<el-option v-for="item in subList" :key="item.id" :value="item.id" :label="item.name"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button @click="searchHandler">查询</el-button>
					<el-button type="primary">新增</el-button>
				</el-form-item>
			</el-form>

		</div>
		<el-table
			:data="list"
			border
			style="width: 100%">
			<el-table-column
				fixed
				type="index"
				width="50"
				align="center">
			</el-table-column>
			<el-table-column
				prop="name"
				label="商品名称"
				width="180"
				show-overflow-tooltip>
			</el-table-column>
			<el-table-column
				label="商品类别"
				width="200">
				<template slot-scope="{ row }">
					<span v-text="row.mainCategoryName"></span>- <span v-text="row.subCategoryName"></span>
				</template>
			</el-table-column>
			<el-table-column
				prop="remark"
				label="商品简介"
				width="300"
				show-overflow-tooltip>
			</el-table-column>
			<el-table-column
				label="价格/元"
				width="80">
				<template slot-scope="{ row }">
					<span> ￥ {{ row.price }}</span>
				</template>
			</el-table-column>
			<el-table-column
				fixed="right"
				label="avatar"
				width="80"
				align="center">
				<template slot-scope="{ row }">
					<el-popover placement="left" trigger="hover" width="200">
						<el-image :src="row.avatar"></el-image>
						<i slot="reference" class="el-icon-picture"></i>
					</el-popover>
					/
					<i class="el-icon-edit"></i>
				</template>
			</el-table-column>
			<el-table-column
				fixed="right"
				label="banner"
				width="80"
				align="center">
				<template slot-scope="{ row }">
					<i class="el-icon-edit-outline" @click="beginBannerEdit(row)"></i>
				</template>
			</el-table-column>
			<el-table-column
				fixed="right"
				label="操作"
				width="160"
				align="center">
				<template>
					<el-button type="text">edit</el-button>
					<el-button type="text">delete</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			background
			:total="pagination.total"
			:page-size="pagination.pageSize"
			layout="prev, pager,next,jumper, ->,total,sizes"
			:page-sizes="[5, 8, 10, 15]"
			@current-change="pageChange"
			@size-change="sizeChange">
		</el-pagination>
		<el-dialog :visible="banner.isEdit" width="700px" @close=" endBannerEdit">
			<h2 slot="title">banner - {{ banner.title }}</h2>
			<el-upload
				name = 'banner'
				:data="{ id: banner.id }"
				list-type="picture-card"
				:file-list="banner.list"
				accept=".jpg,.png"
				multiple
				action="/product/banner/upload"
				:on-success="handlerBannerUploadSuccess"
				:before-remove="handlerBannerRemove">
				<i class="el-icon-plus"></i>
			</el-upload>
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
        import { mapActions } from 'vuex';
        import API from '../../util/api.js';

        export default {
                data() {
                        return {
                                pagination: { pageSize: 5, index: 1, total: 0 },       //分页相关的信息;  分页显示 五条； index 表示第一页； total 表示总数量数
                                list: [],                             //当前展示的 商品数据
                                mainList: [],                   //当前 显示的 一级分类的数据
                                subList: [],                    //当前显示的 二级分类的数据
                                search: { name: '',mId: 0, sId: 0 },
                                search2: { name: '',mId: 0, sId: 0 },
                                banner: { isEdit: false, list: [], id: 0,title: '' },                    //轮播图的驱动数据
                        };
                },
                watch: {
                        'search.mId': function(newValue,oldValue) {
                                this.search.sId = 0;
                                if(newValue === 0) this.subList = [];
                                else this.getData(newValue).then(data => this.subList = data);
                        }
                },
                methods: {
                        ...mapActions('category',['getData']),
                        getProductData(index) {                      //查询商品数据；  index表示想要请求 哪一页
                                this.pagination.index = index;
                                let begin = (index - 1) * this.pagination.pageSize;
                                API.product.getProductData({ ...this.search2, begin, pageSize: this.pagination.pageSize })
                                        .then(({ total, list }) => {            //将返回的 total ，list 解构出来使用
                                                this.list = list;
                                                this.pagination.total = total;
                                        });
                        },
                        pageChange(index) {
                                this.getProductData(index);
                        },
                        sizeChange(size) {
                                this.pagination.pageSize = size;
                                this.getProductData(1);
                        },
                        searchHandler() {
                                this.search2 = { ...this.search };
                                this.getProductData(1);
                        },
                        beginBannerEdit(row) {
                                this.banner.id = row.id;
                                this.banner.title = row.name;
                                if(row.bannerImgs !== '') {
                                        row.bannerImgs.split(',').forEach(item => {
                                                this.banner.list.push({
                                                        name: item.slice(item.lastIndexOf('/') + 1),
                                                        url: item
                                                })
                                        });
                                }
                                this.banner.isEdit = true;
                        },
                        endBannerEdit() {
                                this.banner.isEdit = false;
                                this.banner.id = 0;
                                this.banner.list = [];
                                this.banner.title = '';
                        },
                        handlerBannerUploadSuccess({ status, data, message }, file, fileList) {
                                console.log(status);
                                if(status === 200) {
                                        this.$message('banner图片上传成功', '提示', { type: 'success'});
                                        let target = this.list.find(item => item.id === this.banner.id);                        //找到的那个商品
                                        if(target) {
                                                target.bannerImgs = target.bannerImgs === '' ? data : `${ target.bannerImgs }, ${ data }`;
                                        }
                                } else this.$message(message, '提示', { type: 'error'});
                        },
                        handlerBannerRemove(file, fileList) {
                                let filePath = file.response ? file.response.data : file.url;
                                let target = this.list.find(item => item.id === this.banner.id);
                                if(!target) { return false; }
                                let oldBannerImgs = target.bannerImgs;
                                let temp = oldBannerImgs.split(',');
                                temp.splice(temp.indexOf(filePath),1);
                                let newBannerImgs = temp.join(',');
                                return API.product.removeBanner({ id: this.banner.id, filePath, newBannerImgs })
                                        .then(() => {
                                                target.bannerImgs =newBannerImgs;
                                        });
                        }
                },
                created() {
                        //请求一级分类的数据
                        this.getData(0).then(data => this.mainList = data);
                        this.getProductData(1);
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		.search-wrapper
			min-width: 1200px
</style>