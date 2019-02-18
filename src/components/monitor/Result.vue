<template>
    <div id="monitor_result">
        <el-row type="flex" justify="center">
            <el-col :span="6" v-for="info in infoList" :key="info.name" class="info">
                <h3>{{ info.name }}</h3>
                <el-progress v-if="info.value <= 60" type="circle" :percentage="info.value" color="#00EC00"></el-progress>
                <el-progress v-if="info.value <= 85 && info.value > 60" type="circle" :percentage="info.value" color="#FF8000"></el-progress>
                <el-progress v-if="info.value > 85" type="circle" :percentage="info.value" status="" color="#FE2E2E"></el-progress>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props:{
        infoList: Array
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
