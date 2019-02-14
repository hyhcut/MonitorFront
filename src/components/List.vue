<template>
    <div id="list">
        <el-table :data="dataList">
            <el-table-column v-for="col in colList" :key="col.name" :prop="col.name" :label="col.label">

            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props:{
        dataList: Array,
        colList: Array
    }
}
</script>

<style>

</style>
