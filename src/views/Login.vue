<template>
    <div class="login">
        <el-row type="flex" justify="center">
            <el-col :span="12" style="text-align:center">
                <h1>Monitor</h1>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center"> 
            <el-col :span="8">
                <el-form :model="login" label-position="right" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="login.username" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="login.password" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-button type="primary">登录</el-button>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'login',
  data(){
    return{
      login:{
        username: '',
        password: ''
      }
    }
  },
  methods:{
  }
}
</script>

<style>

</style>
