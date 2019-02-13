<template>
    <div id="user">
        <el-row type="flex" justify="end">
            <el-col :span="4">
                <m-form-dialog :dialog="dialog" :form="form"></m-form-dialog>
            </el-col>
        </el-row>
        <user-list :data-list="data_list" :col-list="col_list"></user-list>
    </div>
</template>

<script>
import UserList from '@/components/UserList.vue'
import FormDialog from '@/components/FormDialog.vue'

export default {
    components:{
        'user-list': UserList,
        'm-form-dialog': FormDialog
    },
    data(){
        return{
            data_list:[],
            col_list:[
                {
                    name: 'username',
                    label: '用户名'
                },
                {
                    name: 'power',
                    label: '身份权限'
                },
                {
                    name: 'last_time',
                    label: '最后登陆时间'
                }
            ],
            dialog:{
                title: '新增人员',
                button: {
                    type: 'primary',
                    label: '添加'
                }
            },
            form:{
                name: 'add_user',
                label_position: 'right',
                label_width: '80px',
                unit_list:[
                    {
                        name: 'username',
                        label: '用户名',
                        type: 1,
                        placeholder: '用户名',
                        input_type: 'text',
                        value: '',
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
                        value: '',
                        rules:[
                            { required: true, message: '密码不能为空', trigger: 'blur' }
                        ]
                    }
                ]
            }
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
