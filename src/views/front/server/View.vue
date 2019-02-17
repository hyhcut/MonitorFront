<template>
    <div id="server_view">
        <el-tabs type="border-card">
            <el-tab-pane label="基本信息">
                <el-row>
                    <el-col :span="12">
                        <el-card shadow="hover">

                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card shadow="hover">
                            <monitor-result :result="result"></monitor-result>
                        </el-card>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="监控列表">监控列表</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import MonitorResult from '@/components/monitor/Result.vue'

export default {
    components:{
        'monitor-result': MonitorResult
    },
    data(){
        return{
            result:{},
            server:{}
        }
    },
    methods:{
        init(id){
            this.$ajax.post('/server/get', {id: id})
            .then((res) => {
                if (res.data.code === 200){
                    this.server = res.data.data;
                    this.init_base_monitor();
                } else {
                    this.$notify.error({
                        title: '获取服务器数据失败',
                        message: res.data.data,
                        duration: 0
                    })
                }
            }).catch((err) => {
                this.$notify.error({
                    title: '获取服务器数据失败',
                    message: '请检查网络设置或联系管理员',
                    duration: 0
                })
            });
        },
        init_base_monitor(){
            this.$ajax.post('/server/view/monitor', this.server)
            .then((res) => {
                if (res.data.code === 200){
                    this.result = res.data.data;
                } else {
                    this.$notify.error({
                        title: '获取监控数据失败',
                        message: res.data.data,
                        duration: 0
                    })
                }
            }).catch((err) => {
                this.$notify.error({
                    title: '获取监控数据失败',
                    message: '请检查网络设置或联系管理员',
                    duration: 0
                })
            });
        }
    },
    beforeMount(){
        this.init(this.$route.params.id);
    }
}
</script>

<style>

</style>
