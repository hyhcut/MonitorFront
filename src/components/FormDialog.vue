<template>
    <div id="dialog">
        <el-button :type="dialog.button.type" @click="show = true" round>{{ dialog.button.label }}</el-button>

        <el-dialog :title="dialog.title" :visible.sync="show">
        <m-form :form="form"></m-form>
        </el-dialog>
    </div>
</template>

<script>
import Form from '@/components/Form.vue'

export default {
    props:{
        dialog: Object,
        form: Object
    },
    components:{
        'm-form': Form
    },
    data(){
        return{
            show: false
        }
    }
}
</script>

<style>

</style>
