<template>
    <div id="server">
        <el-row>
            <el-col>
                <h1>服务器列表</h1>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <server-list :table="table"></server-list>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import ListWithOperation from '@/components/list/ListWithOperation.vue'

export default {
    components:{
        'server-list': ListWithOperation
    },
    data(){
        return{
            table:{
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
            }
        }
    }
}
</script>

<style>

</style>
