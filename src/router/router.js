import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register.vue'
import Signin from '@/components/Signin.vue'
import Admin from '@/components/Admin.vue'
import Instructions from '@/components/instructions.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Instructions
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path : '/signin',
      name : 'signin',
      component : Signin
    },
    {
      path: '/admin',
      name: 'admin',
      component : Admin
    },
    {
      path: '/instructions',
      name: 'instructions',
      component: Instructions
    }
  ]
})
