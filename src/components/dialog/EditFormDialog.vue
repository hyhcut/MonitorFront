<template>
    <el-dialog :title="dialog.title" :visible.sync="dialog.switch" @close="handleClose" append-to-body>
        <m-form :form="form" ref="form"></m-form>
        <span slot="footer">
            <el-button type="primary" @click="submit(dialog.name)">确定</el-button>
            <el-button @click="close_dialog">关闭</el-button>
        </span>
    </el-dialog>
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
    inject:['submit', 'submit_callback'],
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
        close_dialog(){
            this.dialog.switch = false;
        }
    },
    mounted(){
        this.init_form();
    }
}
</script>

<style>

</style>
