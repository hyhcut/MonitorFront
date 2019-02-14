<template>
    <div id="user">
        <el-row type="flex" justify="end">
            <el-col :span="4">
                <el-button type="primary" @click="add_dialog.switch = true" round>添加</el-button>
                <add-dialog :dialog="add_dialog" :form="add_form" ref="add_dialog"></add-dialog>
            </el-col>
        </el-row>
        <user-list :data-list="data_list" :col-list="col_list"></user-list>
    </div>
</template>

<script>
import UserList from '@/components/UserList.vue'
import FormDialogWithRefresh from '@/components/dialog/FormDialogWithRefresh.vue'

export default {
    components:{
        'user-list': UserList,
        'add-dialog': FormDialogWithRefresh
    },
    data(){
        return{
            data_list:[],
            col_list:[
                {
                    name: 'username',
                    label: '用户名',
                    show: true
                },
                {
                    name: 'power',
                    label: '身份权限',
                    show: true
                },
                {
                    name: 'last_time',
                    label: '最后登陆时间',
                    show: true
                }
            ],
            add_dialog:{
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
    provide(){
        return{
            refresh: this.get_user_list
        }
    },
    methods:{
        get_user_list(){
            this.$ajax.post('/user/list')
            .then((res) => {
                if (res.data.code === 200) {
                    this.data_list = res.data.data;
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    mounted(){
        this.get_user_list();
    }
}
</script>

<style>

</style>
