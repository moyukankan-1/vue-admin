import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/login',
      hidden: false,
      meta:{
        name: '主页'
      }
    },
    {
      path: '/login',
      component: () => import('../views/login/index.vue'),
      hidden: false,
      meta:{
        name: '登录'
      }
    },
    {
      path: '/backstage',
      component: () => import('../views/layout/index.vue'),
      hidden: true,
      redirect: '/index',
      meta: {
        name: '控制台'
      },
      children: [
        {
          path: '/index',
          component: () => import('../views/backstage/index.vue'),
          meta: {
            name: '首页'
          }
        }
      ]
    },
    {
      path: '/info',
      component: () => import('../views/layout/index.vue'),
      hidden: true,
      meta:{
        name: '信息管理'
      },
      children: [
        {
          path: '/infoIndex',
          component: () => import('../views/info/index.vue'),
          meta:{
            name: '信息列表'
          }
        },
        {
          path: '/infoCategory',
          component: () => import('../views/info/category.vue'),
          meta:{
            name: '信息列表'
          }
        }
      ]
    },
    {
      path: '/user',
      component: () => import('../views/layout/index.vue'),
      hidden: true,
      meta:{
        name: '用户管理'
      },
      children: [
        {
          path: '/userIndex',
          component: () => import('../views/user/index.vue'),
          meta:{
            name: '用户列表'
          }
        }
      ]
    }
  ]

const router = new VueRouter({
  routes,
})

export default router
