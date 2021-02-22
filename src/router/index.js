import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: '首页' }
    }]
  },

  {
    path: '/personnelManagement',
    component: Layout,
    redirect: 'personnelManagement/table',
    name: 'personnelManagement',
    meta: { title: '人员管理', icon: '人员管理' },
    children: [
      {
        path: 'administrator',
        name: 'Administrator',
        component: () => import('@/views/administrator/index'),
        meta: { title: '管理员', icon: '管理员' }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '用户', icon: '用户' }
      }
    ]
  },

  {
    path: '/menu',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Menu',
        component: () => import('@/views/menu/index'),
        meta: { title: '菜谱', icon: '菜谱' }
      }
    ]
  },

  {
    path: '/foodMaterial',
    component: Layout,
    redirect: '/nested/menu1',
    children: [
      {
        path: 'foodMaterial',
        component: () => import('@/views/foodMaterial/index'), // Parent router-view
        name: '食材材料',
        meta: {
          title: '食材',
          icon: '材料'
        }
      }
    ]
  },

  {
    path: '/orderForm',
    component: Layout,
    redirect: '/orderForm',
    children: [
      {
        path: 'orderForm',
        meta: { title: '订单', icon: '订单' },
        name: 'orderForm',
        component: () => import('@/views/orderForm/index')
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
