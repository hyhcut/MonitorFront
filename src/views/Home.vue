<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row type="flex" justify="space-between">
          <el-col :span="12">
            <h1 class="text-center">Monitor</h1>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col :span="12" v-if="power == 999">
                <el-button type="primary" @click="admin" plain>后台</el-button>  
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
// @ is an alias to /src
import Menu from '@/components/Menu.vue'

export default {
  data(){
    return{
      menu_list: [
        {
          url: '/server',
          icon: 'el-icon-setting',
          label: '服务器'
        },
        {
          url: '/group',
          icon: 'el-icon-menu',
          label: '群组'
        },
        {
          url: '/monitor',
          icon: 'el-icon-view',
          label: '监控'
        },
        {
          url: '/manual',
          icon: 'el-icon-service',
          label: '手动'
        }
      ],
      power: 0
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
    admin(){
      this.$router.push({path: decodeURIComponent("/admin")})
    }
  },
  mounted(){
    this.power = this.$cookies.get('power');
  }
}
</script>

<style>
.text-center{
  text-align: center
}
.main{
  min-height: 400px
}
</style>