<template>
    <div class="login">
        <el-row type="flex" justify="center">
            <el-col :span="12" style="text-align:center">
                <h1>Monitor</h1>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" v-loading="loading"> 
            <el-col :span="4">
                <el-form :model="login_form" ref="login_form" :rules="rules">
                    <el-form-item prop="username">
                        <el-input v-model="login_form.username" placeholder="用户名" @keyup.enter.native="login('login_form')"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="login_form.password" placeholder="密码" type="password" @keyup.enter.native="login('login_form')"></el-input>
                    </el-form-item>
                    <el-button class="btn-login" type="primary" @click="login('login_form')">登录</el-button>
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
      login_form:{
        username: '',
        password: ''
      },
      loading: false,
      rules:{
          username: [
              { required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          password:[
              { required: true, message: '密码不能为空', trigger: 'blur'}
          ]
      }
    }
  },
  methods:{
      login(form_name){
          this.loading = true;
          this.$refs[form_name].validate((valid) => {
              if (valid) {
                  this.$ajax.post('/login', this.login_form)
                  .then((res) => {
                      if (res.data.code === 200) {
                          this.$cookies.set("status", "logined", 30 * 60);
                          this.$cookies.set("power", res.data.data.power, 30 * 60);
                          let redirect = decodeURIComponent(
                              this.$route.query.redirect || "/home"
                          );
                          this.$notify.success({
                              title: '登陆成功',
                              message: '欢迎使用监控者系统',
                              duration: 1500
                          })
                          this.$router.push({path: redirect});
                      } else {
                          this.$notify.error({
                              title: '登陆失败',
                              message: res.data.data,
                              duration: 0
                          })
                          this.loading = false;
                      }
                  }).catch((err) => {
                        this.$notify.error({
                            title: '连接服务器失败',
                            message: "请检查网络配置或联系管理员",
                            duration: 0
                        })
                        this.loading = false;
                  });
              } else {
                  this.loading = false;
                  return false;
              }
          })
      }
  }
}
</script>

<style>
.btn-login{
    width: 100%
}
</style>
