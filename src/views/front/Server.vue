<template>
    <div id="server">
        <el-row type="flex" justify="end">
            <el-button type="primary" @click="add_dialog.switch = true" round>添加</el-button>
        </el-row>
        <el-row>
            <el-col :span="24">
                <server-list :table="table"></server-list>
            </el-col>
        </el-row>
        <add-dialog :ref="add_dialog.name" :dialog="add_dialog" :form="add_form"></add-dialog>
        <add-dialog :ref="edit_dialog.name" :dialog="edit_dialog" :form="edit_form"></add-dialog>
    </div>
</template>

<script>
import ListWithOperation from '@/components/list/ListWithOperation.vue'
import FormDialogWithRefresh from '@/components/dialog/FormDialogWithRefresh.vue'

export default {
    components:{
        'server-list': ListWithOperation,
        'add-dialog': FormDialogWithRefresh
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
        var ip_check = (rule, value, callback) =>{
            let re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
            if (!re.test(value)){
                callback(new Error('IP地址不正确'));
            } else{
                callback();
            }
        };
        return{
            table:{
                data_url: '/server/list',
                data: [],
                col_list: [
                    {
                        name: 'name',
                        label: '名称'
                    },
                    {
                        name: 'type',
                        label: '类型'
                    },
                    {
                        name: 'address',
                        label: '地址'
                    },
                    {
                        name: 'username',
                        label: '登录名'
                    }
                ]
            },
            add_dialog:{
                name: 'add_dialog',
                title: '添加服务器',
                switch: false
            },
            edit_dialog:{
                name: 'edit_dialog',
                title: '编辑服务器',
                switch: false
            },
            add_form:{
                name: 'server',
                label_position: 'right',
                label_width: '80px',
                url: '/server/add',
                sync: false,
                data:{
                    type_id: '',
                    name: '',
                    address: '',
                    username: '',
                    password: '',
                    confirm_password: ''
                },
                unit_list:[
                    {
                        name: 'type_id',
                        label: '类型',
                        type: 2,
                        placeholder: '类型',
                        option_url: '/server/type/list',
                        sync: false,
                        rules:[
                            { required: true, message: '请选择类型', trigger: ['blur', 'change'] }
                        ]
                    },
                    {
                        name: 'name',
                        label: '名称',
                        type: 1,
                        placeholder: '名称',
                        input_type: 'text',
                        rules:[
                            { required: true, message: '名称不能为空', trigger: 'blur' }
                        ]
                    },
                    {
                        name: 'address',
                        label: '地址',
                        type: 1,
                        placeholder: '地址',
                        input_type: 'text',
                        rules:[
                            { required: true, message: '地址不能为空', trigger: 'blur' },
                            { validator: ip_check, trigger: 'blur' }
                        ]
                    },
                    {
                        name: 'username',
                        label: '登录名',
                        type: 1,
                        placeholder: '登录名',
                        input_type: 'text',
                        rules:[
                            { required: true, message: '登录名不能为空', trigger: 'blur' }
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
                        type: 1,
                        placeholder: '密码',
                        input_type: 'password',
                        rules:[
                            { validator: add_confirm_password, trigger: 'blur' }
                        ]
                    }
                ]
            },
            edit_form:{
                name: 'server',
                label_position: 'right',
                label_width: '80px',
                url: '/server/update',
                sync: false,
                data:{
                    type_id: '',
                    name: '',
                    address: '',
                    username: '',
                    old_password: '',
                    new_password: '',
                    confirm_password: ''
                },
                unit_list:[
                    {
                        name: 'type_id',
                        label: '类型',
                        type: 2,
                        placeholder: '类型',
                        option_url: '/server/type/list',
                        sync: false,
                        rules:[
                            { required: true, message: '请选择类型', trigger: ['blur', 'change'] }
                        ]
                    },
                    {
                        name: 'name',
                        label: '名称',
                        type: 1,
                        placeholder: '名称',
                        input_type: 'text',
                        rules:[
                            { required: true, message: '名称不能为空', trigger: 'blur' }
                        ]
                    },
                    {
                        name: 'address',
                        label: '地址',
                        type: 1,
                        placeholder: '地址',
                        input_type: 'text',
                        rules:[
                            { required: true, message: '地址不能为空', trigger: 'blur' },
                            { validator: ip_check, trigger: 'blur' }
                        ]
                    },
                    {
                        name: 'username',
                        label: '登录名',
                        type: 1,
                        placeholder: '登录名',
                        input_type: 'text',
                        rules:[
                            { required: true, message: '登录名不能为空', trigger: 'blur' }
                        ]
                    },
                    {
                        name: 'old_password',
                        label: '密码',
                        type: 1,
                        placeholder: '密码',
                        input_type: 'password',
                        rules:[
                            { required: true, message: '密码不能为空', trigger: 'blur' }
                        ]
                    },
                    {
                        name: 'new_password',
                        label: '密码',
                        type: 1,
                        placeholder: '密码',
                        input_type: 'password',
                        rules:[
                            
                        ]
                    },
                    {
                        name: 'confirm_password',
                        label: '再次输入',
                        type: 1,
                        placeholder: '密码',
                        input_type: 'password',
                        rules:[
                            { validator: edit_confirm_password, trigger: 'blur' }
                        ]
                    }
                ]
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
            } else {
                this.$notify.error({
                    title: '操作失败',
                    message: data.data,
                    duration: 1500
                })
            }
        },
        edit(id){
            this.$ajax.post('/server/get', {id: id})
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
