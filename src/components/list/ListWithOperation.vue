<template>
    <div id="list_with_operation">
        <el-table :table="table">
            <el-table-column v-for="col in table.col_list" :key="col.name" :prop="col.name" :label="col.label">

            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props:{
        table: Object
    }
}
</script>

<style>

</style>
