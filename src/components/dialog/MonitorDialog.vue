<template>
    <div id="manual_result_dialog">
        <el-row type="flex" justify="center">
            <el-dialog :title="dialog.title" :visible.sync="dialog.switch" append-to-body>
                <el-row type="flex" justify="center">
                    <h1>{{ result.name }}</h1>
                    <h2>{{ result.address }}</h2>
                </el-row>
                <monitor-result :info-list="result.info_list"></monitor-result>
            </el-dialog>
        </el-row>
    </div>
</template>

<script>
import MonitorResult from '@/components/monitor/Result.vue'

export default {
    props:{
        dialog: Object,
        result: Object
    },
    components:{
        'monitor-result': MonitorResult
    }
}
</script>

<style>

</style>
