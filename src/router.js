import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Server from './views/front/Server.vue'
import Group from './views/front/Group.vue'
import Monitor from './views/front/Monitor.vue'
import User from './views/admin/User.vue'
import Admin from './views/Admin.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      meta:{
        requiresAuth:true
      },
      children:[
        {
          path: 'server',
          component: Server
        },
        {
          path: 'group',
          component: Group
        },
        {
          path: 'monitor',
          component: Monitor
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta:{
        requiresAuth:true
      },
      children:[
        {
          path: '/user',
          name: 'user',
          component: User
        }
      ]
    }
  ]
})