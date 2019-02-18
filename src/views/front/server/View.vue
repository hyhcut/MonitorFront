<template>
    <div id="server_view">
        <el-tabs type="border-card">
            <el-tab-pane label="基本信息">
                <el-row>
                    <el-col :span="12">
                        <el-card shadow="hover">
                            <div slot="header" class="clearfix">
                                <span>基本信息</span>
                            </div>
                            <h1>类型: {{ server.type }}</h1>
                            <h1>名称: {{ server.name }}</h1>
                            <h1>地址: {{ server.address }}</h1>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card shadow="hover" v-loading="base_monitor_loading">
                            <div slot="header" class="clearfix">
                                    <span>性能监控</span>
                                    <el-button type="text" @click="init_base_monitor" icon="el-icon-refresh"></el-button>
                            </div>
                            <monitor-result :info-list="result.info_list"></monitor-result>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-card shadow="hover">
                            <div slot="header" class="clearfix">
                                <span>未完待续</span>
                            </div>
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
            server:{},
            base_monitor_loading: true
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
            this.base_monitor_loading = true;
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
                this.base_monitor_loading = false;
            }).catch((err) => {
                this.$notify.error({
                    title: '获取监控数据失败',
                    message: '请检查网络设置或联系管理员',
                    duration: 0
                })
                this.base_monitor_loading = false;
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
