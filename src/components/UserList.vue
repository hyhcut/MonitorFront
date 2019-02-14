<template>
    <div id="list_with_operation">
        <el-table :data="dataList">
            <el-table-column v-for="col in colList" :key="col.name" :prop="col.name" :label="col.label">

            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
                    <edit-dialog :dialog="edit_dialog" :form="edit_form" ref="edit_dialog"></edit-dialog>
                    <el-button type="danger" @click="handleDelete(scope.$index, scope.row, dataList)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import FormDialogWithRefresh from '@/components/dialog/FormDialogWithRefresh.vue'

export default {
    props:{
        dataList: Array,
        colList: Array
    },
    components:{
        'edit-dialog': FormDialogWithRefresh
    },
    data(){
        let confirm_password = (rule, value, callback) => {
            if (value !== this.edit_form.data.new_password) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback()
            }
        };
        let new_password = (rule, value, callback) => {
            if (value == this.edit_form.data.old_password) {
                callback(new Error('新密码不能与旧密码相同'))
            } else {
                callback()
            }
        }
        return{
            edit_dialog:{
                title: '人员编辑',
                switch: false
            },
            edit_form:{
                name: 'edit_user',
                label_position: 'right',
                label_width: '80px',
                url: '/user/update',
                unit_list:[
                    {
                        name: 'username',
                        label: '用户名',
                        type: 1,
                        placeholder: '用户名',
                        input_type: 'text',
                        rules:[
                            { required: true, message: '用户名不能为空', trigger: 'blur' }
                        ]
                    },
                    {
                        name: 'old_password',
                        label: '原密码',
                        type: 1,
                        placeholder: '原密码',
                        input_type: 'password',
                        rules:[
                            { required: true, message: '原密码不能为空', trigger: 'blur' }
                        ]
                    },
                    {
                        name: 'new_password',
                        label: '新密码',
                        type: 1,
                        placeholder: '新密码',
                        input_type: 'password',
                        rules:[

                        ]
                    },
                    {
                        name: 'confirm_password',
                        label: '再次输入',
                        type: 1,
                        placeholder: '新密码',
                        input_type: 'password',
                        rules:[
                            { validator: confirm_password, trigger: 'blur' }
                        ]
                    },
                    {
                        name: 'power_id',
                        label: '身份权限',
                        type: 2,
                        placeholder: '身份权限',
                        option_url: '/power/list',
                        rules:[
                            { required: true, message: '请设置身份权限', trigger: ['blur', 'change'] }
                        ]
                    }
                ],
                data: {
                    id: '',
                    username: '',
                    old_password: '',
                    new_password: '',
                    confirm_password: '',
                    power_id: ''
                }
            }
        }
    },
    methods:{
        handleDelete(index, row, data_list){
            this.$confirm('确定要删除用户' + row.username + '吗?', '删除',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                this.$ajax.post('/user/delete', { id: row.id })
                .then((res) => {
                    if (res.data.code === 200){
                        this.$notify.success({
                            title: '删除成功',
                            message: '用户' + row.username + '已删除',
                            duration: 1500,
                            onClose(){
                                data_list.splice(index, 1);
                            }
                        })
                    } else {
                        this.$notify.error({
                            title: '删除失败',
                            message: res.data.data,
                            duration: 0
                        })
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }).catch(() => {

            });
        },
        edit(user_id){
            this.$ajax.post('/user/get', { id: user_id })
            .then((res) => {
                if (res.data.code === 200){
                    for (const key in res.data.data) {
                        if (this.edit_form.data.hasOwnProperty(key)) {
                            this.edit_form.data[key] = res.data.data[key];
                        }
                    }
                    this.edit_dialog.switch = true;
                }
            }).catch((err) => {
                
            });
        }
    }
}
</script>

<style>

</style>
