<template>
	<div class="page-wrapper">
		<el-tree
			ref="tree"
			node-key="id"
			:props="{ isLeaf  : 'leaf' }"
			lazy
			:load="loadNode"
			:expand-on-click-node="false">
			<span class="custom-tree-node" slot-scope="{ node, data }">
				<span v-text="data.name"></span>
				<span>
					<el-button type="text" v-if="node.level < 3" @click="beginEdit(data, true)"><i class="el-icon-plus"></i></el-button>
					<template v-if="node.level > 1">
						<el-button type="text" @click="beginEdit(data, false)"><i class="el-icon-edit-outline"></i></el-button>
						<el-button type="text" slot="reference"><i class="el-icon-delete"></i></el-button>
						<template v-if="node.level > 2">
							<el-popover trigger="hover" placement="right" :title="data.name" width="200">
								<el-image :src="data.avatar" fit="contain"></el-image>
								<el-button type="text" slot="reference"><i class="el-icon-picture" ></i></el-button>
							</el-popover>
						</template>
					</template>
				</span>
			</span>
		</el-tree>
		<el-dialog width="770px" :show-close="false" :visible="isEdit" :title="`商品信息管理 - ${ isAdd ? '新增' : '修改'}`">
			<el-form label-width="100px" ref="form" :model="model" :rules="rules" status-icon  >
				<el-form-item label="父级分类:">
					<el-select v-model="model.fid" :disabled="isAdd || model.fid === 0">
						<el-option label="ROOT" :value="0"></el-option>
						<el-option
							v-for="item in mainList"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="分类名字">
					<el-input v-model="model.name" placeholder="请输入分类名字..."></el-input>
				</el-form-item>
				<el-form-item label="分类图片">
					<div class="avatar-wrapper">
						<div class="old-avatar-wrapper" v-show="!isAdd">
							<template v-if="oldAvatar !== null">
								<el-image :src="oldAvatar"></el-image>
								<p class="old">原图片</p>
							</template>
							<p v-else class="message">暂无图片，等待上传...</p>
						</div>
						<div class="new-avatar-wrapper">
							<el-upload
								ref="upload"
								accept=".jpg,.png"
								list-type="picture-card"
								action="/category/upload"
								name="avatar"
								:before-upload="beforeAvatarUpload"
								:on-success="uploadSuccessHandler"
								:on-remove="uploadRemoveHandler">
								<i class="el-icon-plus avatar-uploader-icon"></i>
								<div slot="tip" class="upload-tip">提示: 只能上传 jpg | png 文件，大小不超过2M</div>
							</el-upload>
						</div>
					</div>
				</el-form-item>
			</el-form>
			<span slot="footer">
				<el-button @click="finishEdit">取消</el-button>
				<el-button type="primary" @click="save">确定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
	import { createNamespacedHelpers } from 'vuex';

	const { mapState,mapGetters, mapActions, mapMutations } =createNamespacedHelpers('category');

        export default {
                data() {
                        return {
                                isEdit: false,                                                  //标识 是否为 修改状态
	                        isAdd: true,                                                   //标识 是否 为新增状态
                                model: { id: 0, fid: -1, name: '', avatar: ''},         //新增一个分类需要添加的内容
	                        oldAvatar: '',                                                  //如果是新增，oldAvatar 为空； 如果是修改，data.avatar
                                rules: {                                                        //验证规则，只验证 model 中的 name
                                        name: [
                                                { required: true, trigger: 'blur', message: '分类名不能为空' },
                                                { min: 2, max: 6, trigger: 'blur', message: '分类名长度必须在 2-6 之间' }
                                        ]
                                }
                        }
                },
	        computed: {
		        ...mapState(['list']),
                        ...mapGetters(['mainList']),
	        },
		methods: {
			...mapActions(['getData','addCategory','removeCategory','updateCategory']),
			loadNode(node, resolve) {
			        switch(node.level) {
				        case 0:                 //懒加载根节点对应的数据
				                resolve([{ id: 0, name: 'ROOT' }]);
				                break;
				        case 1:                 //懒加载 level 为1的节点对应的数据
					        this.getData(node.data.id).then(data => {
					                resolve(data);
                                                });
					        break;
				        case 2:
				                this.getData(node.data.id).then(data => {
				                        console.log(data);
				                        data.forEach(item => item.leaf = true);
				                        resolve(data);
				                });
			        }
			},
			beginEdit(data, isAdd) {
				this.isAdd = isAdd;

				this.model.id = isAdd ? 0 : data.id;
				this.model.fid  = isAdd ? data.id : data.fid;
				this.model.name = isAdd ? '' : data.name;
                                this.model.avatar = '';
				this.oldAvatar = isAdd ? '' : data.avatar;

				this.isEdit = true;
			},
			finishEdit() {
				this.$confirm('确定退出编辑吗?','警告',{ type: 'warning' })
					.then(() => this.isEdit = false)
					.catch(() => {});
			},
			beforeAvatarUpload(file) {
                                const isJPG = file.type === 'image/jpeg';
                                const isPNG = file.type === 'image/png';
                                const isLt2M = file.size / 1024 / 1024 < 2;

                                if ((!isJPG)&&(!isPNG)) {
                                        this.$message.error('图片必须为 jpg 或 png 类型!');
                                }
                                if (!isLt2M) {
                                        this.$message.error('图片必须小于 2MB!');
                                }
                                return (isJPG || isPNG) && isLt2M;
			},
                        uploadSuccessHandler(response,file,fileList) {
				if(response.status === 200) {
				        this.model.avatar = response.data;
				        if(fileList.length > 1) fileList.splice(0,1);
				}
                        },
			uploadRemoveHandler(file,fileList) {
			        this.model.avatar = '';
			        fileList.shift();
			},
                        remove(data) {
                                this.$confirm('确认删除？','提示', { type: 'warning', showClose: false })
                                        .then(() => this.removeCategory({id: data.id, avatar: data.avatar }))
                                        .then(() => this.$refs.tree.remove(data))
                                        .catch(() => {});
                        },
			save() {
				this.$refs.form.validate()
					.then(() => {
				                if(this.isAdd) this._addCategory();
				                else this._updateCategory();
					})
					.catch(() => {});
			},
			_addCategory() {
				if(this.model.avatar === '') {
				        this.$message({ message: "请至少选择一张图片...", type:'warning'});
				        return;
				}
                                this.addCategory(this.model)
                                        .then(id => {
                                                this.isEdit = false;
                                                let parentNode = this.$refs.tree.getNode(this.model.fid);
                                                let newNodeData = Object.assign(
                                                        {},
                                                        this.model,
                                                        {id, leaf: this.model.fid !== 0, avatar:'/images/category/' + this.model.avatar });
                                                this.$refs.tree.append(newNodeData,parentNode);
                                        });
			},
			_updateCategory() {
                                this.updateCategory({...this.model, oldAvatar:this.oldAvatar })
                                        .then(data => {
                                                let node = this.$refs.tree.getNode(data.id);
                                                if(node.data.fid === data.fid) {                                                        //fid 没有发生变化的情况
                                                        node.data.name = data.name;
                                                        node.data.avatar = data.avatar;
                                                } else if(this.list.findIndex(item => item.id === data.id) === -1) {    //fid 变了，但是新的父亲没有被懒加载过
                                                        this.$refs.tree.remove(node);
                                                } else {                                                                                //fid 变了且新的父亲已经被懒加载过
                                                        let parentNode = this.$refs.tree.getNode(data.fid);
                                                        this.$refs.tree.remove(node);
                                                        this.$refs.tree.append({...data,leaf:true }, parentNode);
                                                }
                                                this.isEdit = false;
                                        })
			}

		},
	        created() {
		        this.getData(0);
	        },
                watch: {
                        isEdit(newValue, oldValue) {
                                if(!newValue) {
                                        this.$refs.upload.clearFiles();                         //重置 upload 组件
                                        this.$refs.form.clearValidate();            //重置表单验证
                                }
                        }
                },
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.el-tree
		width: 400px
		.custom-tree-node
			flex: 1
			display: flex
			align-items: center
			justify-content: space-between
			font-size: 14px
			button
				font-size: 16px
	.el-input
		width: 220px
	.avatar-wrapper
		display: flex
		align-items: flex-start
		.old-avatar-wrapper
			width: 148px
			flex-shrink: 0
			margin-right: 10px
			.el-image
				height: 148px
				border: 1px dashed #409eff
				box-sizing: border-box
				boeder-radius: 6px
			p.old
				height: 20px
				line-height: 20px
				margin-top: -8px
				color: #409eff
		.upload-tip
			color: red
</style>