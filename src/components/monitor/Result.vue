<template>
    <div id="monitor_result">
        <el-row type="flex" justify="center">
            <h1>{{ result.name }}</h1>
            <h2>{{ result.address }}</h2>
        </el-row>
        <el-row type="flex" justify="center">
            <div v-for="info in result.info_list" :key="info.name" class="info">
                <h3>{{ info.name }}</h3>
                <el-progress v-if="info.value <= 60" type="circle" :percentage="info.value" color="#00EC00"></el-progress>
                <el-progress v-if="info.value <= 85 && info.value > 60" type="circle" :percentage="info.value" color="#FF8000"></el-progress>
                <el-progress v-if="info.value > 85" type="circle" :percentage="info.value" status="" color="#FE2E2E"></el-progress>
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
    props:{
        result: Object
    }
}
</script>

<style>
.info{
    margin-left: 5%;
    margin-right: 5%;
    text-align: center;
}
</style>
