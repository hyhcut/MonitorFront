<template>
    <el-form :model="form.data" :ref="form.name" :label-position="form.lab_position" :label-width="form.label_width">
        <el-form-item v-for="unit in form.unit_list" :key="unit.name" :label="unit.label" :prop="unit.name" :rules="unit.rules">
            <el-input v-if="unit.type == 1" v-model="form.data[unit.name]" :placeholder="unit.placeholder" :type="unit.input_type"></el-input>
            <el-select v-if="unit.type == 2" v-model="form.data[unit.name]" :placeholder="unit.placeholder" class="full-width">
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
    watch:{
        form: function(n, o){
            console.log(n);
        }
    },
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
        submit(callback){
            this.$refs[this.form.name].validate((valid) => {
                if (valid) {
                    this.$ajax.post(this.form.url, this.form.data)
                    .then((res) => {
                        callback(res.data);
                    }).catch((err) => {
                        callback(err);
                    });
                }
            });
        },
        reset(){
            this.$refs[this.form.name].resetFields();
        }
    },
    mounted(){
        this.init_form();
    }
}
</script>

<style>
.full-width{
    width: 100%
}
</style>
