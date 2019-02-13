<template>
    <el-form :model="form" :ref="form.name" :label-position="form.lab_position" :label-width="form.label_width">
        <el-form-item v-for="unit in form.unit_list" :key="unit.name" :label="unit.label" :prop="unit.name" :rules="unit.rules">
            <el-input v-if="unit.type == 1" v-model="unit.value" :placeholder="unit.placeholder" :type="unit.input_type"></el-input>
            <el-select v-if="unit.type == 2" v-model="unit.value" :placeholder="unit.placeholder">
              <el-option v-for="option in unit.option_list" :key="option.value" :label="option.label" :value="option.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit" round>确定</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    props:{
        form: Object
    },
    methods:{
        submit(){
            let data = {};
            for (const unit of this.form.unit_list) {
                data[unit.name] = unit.value
            }
            console.log(data);
        }
    }
}
</script>

<style>

</style>
