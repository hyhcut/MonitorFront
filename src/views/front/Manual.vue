<template>
    <div id="manual">
        <el-row>
            <el-col :span="24">
                <h1 class="text-center">手动监控</h1>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <server-form :form="form" ref="server_form"></server-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import BaseForm from '@/components/form/BaseForm.vue'

export default {
    components:{
        'server-form': BaseForm
    },
    data(){
        return{
            form:{
                name: 'server_info',
                label_position: 'right',
                label_width: '120px',
                url: '/manual',
                unit_list:[
                    {
                        name: 'type',
                        label: '服务器类型',
                        type: 2,
                        placeholder: '服务器类型',
                        option_url: 'server/type/list',
                        rules:[
                            { required: true, message: '服务器类型不能为空', trigger: ['blur', 'change'] }
                        ]
                    },
                    {
                        name: 'address',
                        label: 'IP',
                        type: 1,
                        placeholder: '服务器地址',
                        input_type: 'text',
                        rules:[
                            { required: true, message: '服务器地址不能为空', trigger: 'blur' }
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
                    }
                ],
                data:{
                    type: '',
                    address: '',
                    username: '',
                    password: ''
                }
            }
        }
    },
    methods:{
        init_form(){
            for (let unit of this.form.unit_list) {
                if (unit.type === 2) {
                    this.$ajax.post(unit.option_url)
                    .then((res) => {
                        if (res.data.code === 200){
                            unit.option_list = res.data.data;
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            } 
        },
    },
    mounted(){
        this.init_form();
        console.log(this.form);
    }
}
</script>

<style>

</style>
