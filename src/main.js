import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import Axios from 'axios';
import FormFunction from './components/form/FormFunction.vue'

Vue.config.productionTip = false

const $cookies = require('vue-cookies')
Vue.use($cookies)
// Axios.defaults.baseURL = 'http://192.168.40.108:5000'
Axios.defaults.baseURL = 'http://localhost:5000'
Vue.prototype.$ajax = Axios
Vue.prototype.$form = FormFunction

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (router.app.$cookies.get("status") !== "logined") {
      next({
        path: '/login',
        query: { redirect: "/" } // 把要跳转的地址作为参数传到下一步
      })
    } else {
      next()
    }
  } else {
    if (to.query && to.query.redirect) {
      if (router.app.$cookies.get("status") === "logined") {
        next({path: to.query.redirect})
      } else {
        next()
      }
    } else {
      next() // 确保一定要调用 next()
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
