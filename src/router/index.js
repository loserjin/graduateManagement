import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '@/layout'

// const { adminId } = sessionStorage.getItem('personalMess')
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
    roles: ['1', '0'],
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: '首页' }
      }
    ]
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
        meta: { title: '管理员', icon: '管理员', roles: ['0'] }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '用户', icon: '用户', roles: ['1', '0'] }
      }
    ]
  },
  {
    path: '/diningHall',
    component: Layout,
    meta: { title: '饭堂楼层信息', icon: '人员管理' },
    children: [
      {
        path: '/dining',
        name: 'diningHall',
        component: () => import('@/views/diningHall/index'),
        meta: { title: '饭堂信息', icon: '菜谱' }
      },
      {
        path: 'index',
        name: 'dingingFloor',
        component: () => import('@/views/diningFloor/index'),
        meta: { title: '楼层信息', icon: '菜谱' }
      }
    ]
  },
  {
    path: '/menuType',
    component: Layout,
    children: [
      {
        path: '/menuType',
        name: 'menuType',
        component: () => import('@/views/menuType/index'),
        meta: { title: '菜系信息', icon: '菜谱' }
      }
    ]
  },
  {
    path: '/menu',
    component: Layout,
    meta: { title: '菜谱信息', icon: '人员管理' },
    children: [
      {
        path: '/menuMessage',
        name: 'Menu',
        component: () => import('@/views/menu/index'),
        meta: { title: '全部菜谱', icon: '菜谱' }
      },
      {
        path: '/burdenSheet',
        name: 'burdenSheet',
        component: () => import('@/views/burdenSheet/index'),
        meta: { title: '菜谱配料表', icon: '菜谱' }
      }
    ]
  },
  {
    path: '/dailyMenu',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'dailyMenu',
        component: () => import('@/views/dailyMenu/index'),
        meta: { title: '日常菜谱', icon: '菜谱' }
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
        component: () => import('@/views/foodMaterial/index'),
        name: '食材材料',
        meta: {
          title: '食材进货',
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
        meta: { title: '用户订单', icon: '订单' },
        name: 'orderForm',
        component: () => import('@/views/orderForm/index')
      }
    ]
  },
  {
    path: '/personal-message',
    component: Layout,
    children: [
      {
        path: '/personal-message',
        name: 'personal-message',
        component: () => import('@/views/personal-message')
      }
    ],
    hidden: true
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
// const asyncRoutes = []
const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
