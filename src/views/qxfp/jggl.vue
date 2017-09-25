<template>
	<div>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getJgGlData">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table
		    ref="multipleTable"
		    :data="jgGlData"
		    border
		    tooltip-effect="dark"
		    style="width: 100%"
		    @selection-change="handleSelectionChange">
		    <el-table-column
		      type="selection"
		       align="center"
		      width="55">
		    </el-table-column>
		    <el-table-column
		      label="日期"
		      align="center"
		      width="120">
		      <template scope="scope">{{ scope.row.date }}</template>
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="姓名"
		      align="center"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="地址"
		      align="center"
		      show-overflow-tooltip>
		    </el-table-column>
		    <el-table-column label="操作" align="center">
		      <template scope="scope">
		        <el-button
		          size="small"
		          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
		        <el-button
		          size="small"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		      </template>
		    </el-table-column>
	    </el-table>
	    <!--工具条-->
		<el-col :span="24" class="toolbar page-show">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.date"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.address"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</div>    
</template>
<script>
	import util from '../../common/js/util.js'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				users: [],
				jgGlData: [],
		        multipleSelection: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					date: '',
					address: ''
				}

			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getJgGlData();
			},
			handleSelectionChange: function (sels) {
				this.sels = sels;
			},
			//获取用户列表
			getJgGlData() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.jgGlData = res.data.JgGlList;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//编辑
			handleEdit(index, row) {
				this.addFormVisible = true;
		        this.addForm = Object.assign({}, row);
		    },
		    handleDelete(index, row) {
		       this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getJgGlData();
					});
				}).catch(() => {

				});
		    },
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					date: '',
					address: ''
				};
			},
			//新增 编辑
			addSubmit: function () {				
					this.$refs.addForm.validate((valid) => {
						if (valid) {
							this.$confirm('确认提交吗？', '提示', {}).then(() => {
								this.addLoading = true;
								//NProgress.start();
								let para = Object.assign({}, this.addForm);
								console.log(this.addForm);
								para.date = (!para.date || para.date == '') ? '' : util.formatDate.format(new Date(para.date), 'yyyy-MM-dd');
								addUser(para).then((res) => {
									this.addLoading = false;
									//NProgress.done();
									this.$message({
										message: '提交成功',
										type: 'success'
									});
									this.$refs['addForm'].resetFields();
									this.addFormVisible = false;
									this.getJgGlData();
								});
							});
						}
					});		
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getJgGlData();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getJgGlData();
		}
	}
</script>
<style>
	.page-show{
		margin-top:10px;
	}
</style>