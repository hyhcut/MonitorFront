<template>
  <div class="admin">
    <el-container>
      <el-header>
        <el-row type="flex" justify="space-between">
          <el-col :span="12">
            <h1 class="text-center">Monitor</h1>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col :span="12">
                <el-button type="primary" @click="home" plain>前台</el-button>  
              </el-col>
              <el-col :span="12">
                <el-button type="danger" @click="logout" plain>注销</el-button>  
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-main class="main">
          <el-row>
            <el-col :span="4">
              <m-menu :menu-list="menu_list"></m-menu>
            </el-col>
            <el-col :span="20">
              <router-view></router-view>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
      <el-footer>
        <el-row type="flex" justify="end">
          <el-col :span="6">
            <h2 class="text-center">Design By hyh_cut</h2>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'

export default {
  data(){
    return{
      menu_list:[
        {
          url: '/user',
          icon: 'el-icon-info',
          label: '人员'
        }
      ]
    }
  },
  components:{
      "m-menu": Menu
  },
  methods:{
      logout(){
          this.$cookies.set("status", "nolog");
          this.$notify.success({
              title: '注销成功',
              message: '即将返回登陆页面',
              duration: 1500,
              onClose(){
              window.location.reload();
              }
          })
      },
      home(){
          this.$router.push({path: decodeURIComponent("/")})
      }
  }
}
</script>

<style>

</style>
