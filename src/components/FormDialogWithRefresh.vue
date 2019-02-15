<template>
    <div id="dialog">
        <el-button :type="dialog.button.type" @click="show = true" round>{{ dialog.button.label }}</el-button>

        <el-dialog :title="dialog.title" :visible.sync="show" @close="handleClose">
            <m-form v-if="form.sync" :form="form" ref="form"></m-form>
            <span slot="footer">
                <el-button type="primary" @click="submit">确定</el-button>
                <el-button type="warning" @click="reset">重置</el-button>
                <el-button @click="close_dialog">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import BaseForm from '@/components/form/BaseForm.vue'

export default {
    props:{
        dialog: Object,
        form: Object
    },
    components:{
        'm-form': BaseForm
    },
    data(){
        return{
            show: false
        }
    },
    inject: ['refresh'],
    methods: {
        submit(){
            this.$refs.form.submit(this.submit_callback)
        },
        submit_callback(flag){
            if (flag) {
                this.show = false;
                this.refresh();
            }
        },
        reset(){
            this.$refs.form.reset();
        },
        close_dialog(){
            this.show = false;
        },
        handleClose(){
            this.reset();
        }
    },
    mounted(){
        this.$form.init(this, this.form);
    }
}
</script>

<style>

</style>
