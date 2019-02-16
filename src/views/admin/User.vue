<template>
    <div id="user">
        <el-row type="flex" justify="end">
            <el-col :span="4">
                <el-button type="primary" @click="add_dialog.switch = true" round>添加</el-button>
            </el-col>
        </el-row>
        <el-row>
          <el-col>
              <m-list :table="table" ref="user_list"></m-list>
          </el-col>
        </el-row>
        <add-dialog :ref="add_dialog.name" :dialog="add_dialog" :form="add_form"></add-dialog>
        <edit-dialog :ref="edit_dialog.name" :dialog="edit_dialog" :form="edit_form"></edit-dialog>
    </div>
</template>

<script>
import ListWithOperation from '@/components/list/ListWithOperation.vue'
import AddFormDialog from '@/components/dialog/AddFormDialog.vue'
import EditFormDialog from '@/components/dialog/EditFormDialog.vue'

export default {
    components:{
        'm-list': ListWithOperation,
        'add-dialog': AddFormDialog,
        'edit-dialog': EditFormDialog
    },
    data(){
        let add_confirm_password = (rule, value, callback) => {
            if (value !== this.add_form.data.password) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback()
            }
        };
        let edit_confirm_password = (rule, value, callback) => {
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
            table:{
                data_url: '/user/list',
                data: [],
                col_list:[
                    {
                        name: 'username',
                        label: '用户名',
                    },
                    {
                        name: 'power',
                        label: '身份权限',
                    },
                    {
                        name: 'last_time',
                        label: '最后登陆时间',
                    }
                ]
            },
            add_dialog:{
                name: 'add_dialog',
                title: '新增人员',
                switch: false
            },
            add_form:{
                name: 'add_user',
                label_position: 'right',
                label_width: '80px',
                url: '/user/add',
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
                        name: 'password',
                        label: '密码',
                        type: 1,
                        placeholder: '密码',
                        input_type: 'password',
                        rules:[
                            { required: true, message: '密码不能为空', trigger: 'blur' }
                        ]
                    },
                    {
                        name: 'confirm_password',
                        label: '再次输入',
                        type: '1',
                        placeholder: '密码',
                        input_type: 'password',
                        rules:[
                            { required: true, message: '密码不能为空', trigger: 'blur' },
                            { validator: add_confirm_password, trigger: 'blur' }
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
                    username: '',
                    password: '',
                    power_id: ''
                }
            },
            edit_dialog:{
                name: 'edit_dialog',
                title: '人员编辑',
                switch: false
            },
            edit_form:{
                name: 'edit_user',
                label_position: 'right',
                label_width: '80px',
                url: '/user/update',
                sync: false,
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
                            { validator: new_password, trigger: 'blur' }
                        ]
                    },
                    {
                        name: 'confirm_password',
                        label: '再次输入',
                        type: 1,
                        placeholder: '新密码',
                        input_type: 'password',
                        rules:[
                            { validator: edit_confirm_password, trigger: 'blur' }
                        ]
                    },
                    {
                        name: 'power_id',
                        label: '身份权限',
                        type: 2,
                        placeholder: '身份权限',
                        option_url: '/power/list',
                        sync: false,
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
        submit(form_name){
            this.$refs[form_name].$refs.form.submit(this.submit_callback);
        },
        submit_callback(data){
            if (data.code === 200) {
                this.$notify.success({
                    title: '操作成功',
                    message: data.data,
                    duration: 1500
                })
                this.add_dialog.switch = false;
                this.edit_dialog.switch = false;
                this.$refs.user_list.get_data();
            } else {
                this.$notify.error({
                    title: '操作失败',
                    message: data.data,
                    duration: 1500
                })
            }
        },
        edit(id){
            this.$ajax.post('/user/get', {id: id})
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
        },
        handleDelete(index, row, table_data){
            this.$confirm('确定要删除用户 ' + row.username + ' 吗?', '删除',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                this.$ajax.post('/user/delete', { id: row.id })
                .then((res) => {
                    if (res.data.code === 200){
                        table_data.splice(index, 1);
                        this.$notify.success({
                            title: '删除成功',
                            message: '用户 ' + row.username + ' 已删除',
                            duration: 1500
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
        }
    },
    provide(){
        return{
            submit: this.submit,
            submit_callback: this.submit_callback,
            edit: this.edit,
            handleDelete: this.handleDelete
        }
    }
}
</script>

<style>

</style>
