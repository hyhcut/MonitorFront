<template>
    <div id="manual">
        <el-row>
            <el-col :span="24">
                <h1 class="text-center">手动监控</h1>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" v-loading="loading">
            <el-col :span="18" style="text-align:center">
                <server-form v-if="manual_form.sync" :form="manual_form" ref="manual_form"></server-form>
                <el-button type="primary" @click="submit">确定</el-button>
                <el-button type="warning" @click="reset">重置</el-button>
            </el-col>
        </el-row>
        <monitor-dialog :dialog="monitor_dialog" :result="monitor_result"></monitor-dialog>
    </div>
</template>

<script>
import BaseForm from '@/components/form/BaseForm.vue'
import MonitorDialog from '@/components/dialog/MonitorDialog.vue'

export default {
    components:{
        'server-form': BaseForm,
        'monitor-dialog': MonitorDialog
    },
    data(){
        // 自定义IP验证
        var ip_check = (rule, value, callback) =>{
            let re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
            if (!re.test(value)){
                callback(new Error('IP地址不正确'));
            } else{
                callback();
            }
        };
        return{
            loading: false,
            monitor_dialog:{
                title: '监控结果',
                switch: false
            },
            monitor_result:{
                name: '',
                address: '',
                info_list: []
            },
            manual_form:{
                name: 'server_info',
                label_position: 'right',
                label_width: '120px',
                url: '/manual',
                sync: false,
                unit_list:[
                    {
                        name: 'server_type',
                        label: '服务器类型',
                        type: 2,
                        placeholder: '服务器类型',
                        option_url: '/server/type/list',
                        sync: false,
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
                            { required: true, message: '服务器地址不能为空', trigger: 'blur' },
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
                    }
                ],
                data:{
                    server_type: '',
                    address: '',
                    username: '',
                    password: ''
                }
            }
        }
    },
    methods:{
        submit(){
            this.loading = true;
            this.$refs.manual_form.submit(this.submit_callback);
        },
        submit_callback(data){
            if(data){
                if (data.code === 200) {
                    this.monitor_result = data.data;
                    this.monitor_dialog.switch = true;
                } else {
                    this.$notify.error({
                        title: '监控失败',
                        message: data.data,
                        duration: 0
                    })
                }
            }
            this.loading = false;
        },
        reset(){
            this.$refs.manual_form.reset();
        }
    },
    beforeMount(){
        this.$form.init(this, this.manual_form);
    }
}
</script>

<style>

</style>
