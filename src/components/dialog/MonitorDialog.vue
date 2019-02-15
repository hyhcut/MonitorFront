<template>
    <el-dialog :title="dialog.title" :visible.sync="dialog.switch" append-to-body>
        <monitor-result :result="result"></monitor-result>
    </el-dialog>
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
