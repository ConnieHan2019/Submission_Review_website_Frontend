import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Contact from '@/components/Contact'
import Personal from '@/components/Personal'
import store from '../store'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        requireAuth: false // 需要登录权限
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal,
      meta: {
        requireAuth: true
      }
    }
  ]
})

// 前端登录拦截
router.beforeEach(function (to, from ,next) {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect:to.fullPath} // 登录成功之后重新跳转到该路由,将目的路由地址存入login的query中
      })
    }
  } else {
    next()
  }
})
