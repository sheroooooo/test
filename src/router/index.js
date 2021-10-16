// import {createRouter, createWebHashHistory} from "vue-router"
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import(/* webpackChunkName: "login" */ '../view/Login.vue')
  }
]
const router = new Router({
  routes,
  mode: 'history'
})
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | vue-manage-system`
  const role = localStorage.getItem('ms_username')
  if (!role && to.path !== '/login') {
    next('/login')
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin'
      ? next()
      : next('/403')
  } else {
    next()
  }
})
export default router
