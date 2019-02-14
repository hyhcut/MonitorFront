<template>
    <el-form :model="form.data" :ref="form.name" :label-position="form.lab_position" :label-width="form.label_width">
        <el-form-item v-for="unit in form.unit_list" :key="unit.name" :label="unit.label" :prop="unit.name" :rules="unit.rules">
            <el-input v-if="unit.type == 1" v-model="form.data[unit.name]" :placeholder="unit.placeholder" :type="unit.input_type"></el-input>
            <el-select v-if="unit.type == 2" v-model="form.data[unit.name]" :placeholder="unit.placeholder">
              <el-option v-for="option in unit.option_list" :key="option.value" :label="option.label" :value="option.value"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    props:{
        form: Object
    },
    methods:{
        submit(callback){
            this.$refs[this.form.name].validate((valid) => {
                if (valid) {
                    this.$ajax.post(this.form.url, this.form.data)
                    .then((res) => {
                        if (res.data.code === 200) {
                            this.$notify.success({
                                title: '操作成功',
                                message: res.data.data,
                                duration: 1500
                            })
                            callback(true);
                        } else {
                            this.$notify.error({
                                title: '操作失败',
                                message: res.data.data,
                                duration: 1500
                            })
                            callback(false);
                        }
                    }).catch((err) => {
                        console.log(err);
                        callback(false);
                    });
                }
            });
        },
        reset(){
            this.$refs[this.form.name].resetFields();
        }
    }
}
</script>

<style>

</style>
