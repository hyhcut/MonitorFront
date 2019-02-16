<template>
    <div id="user">
        <el-row type="flex" justify="end">
            <el-col :span="4">
                <el-button type="primary" @click="add_dialog.switch = true" round>添加</el-button>
            </el-col>
        </el-row>
        <el-row>
          <el-col>
              <user-list :table="table"></user-list>
          </el-col>
        </el-row>
        <add-dialog :ref="add_dialog.name" :dialog="add_dialog" :form="add_form"></add-dialog>
    </div>
</template>

<script>
import ListWithOperation from '@/components/list/ListWithOperation.vue'
import FormDialogWithRefresh from '@/components/dialog/FormDialogWithRefresh.vue'

export default {
    components:{
        'user-list': ListWithOperation,
        'add-dialog': FormDialogWithRefresh
    },
    data(){
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
                this.get_user_list();
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
            console.log(row);
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
