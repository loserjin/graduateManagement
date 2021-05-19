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
  {
    path: '/personnelManagement',
    component: Layout,
    name: 'personnelManagement',
    meta: { title: '人员管理', icon: '人员管理' },
    children: [
      {
        path: 'administrator',
        name: 'Administrator',
        component: () => import('@/views/administrator/index'),
        meta: { title: '管理员', roles: ['1'] }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '用户' }
      }
    ]
  },
  {
    path: '/diningHall',
    component: Layout,
    meta: { title: '饭堂楼层信息', icon: '建筑' },
    children: [
      {
        path: '/dining',
        name: 'diningHall',
        component: () => import('@/views/diningHall/index'),
        meta: { title: '饭堂信息', roles: ['1'] }
      },
      {
        path: 'index',
        name: 'dingingFloor',
        component: () => import('@/views/diningFloor/index'),
        meta: { title: '楼层信息' }
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
        meta: { title: '菜系信息', icon: '菜系' }
      }
    ]
  },
  {
    path: '/menu',
    component: Layout,
    meta: { title: '菜谱信息', icon: '菜单' },
    children: [
      {
        path: '/menuMessage',
        name: 'Menu',
        component: () => import('@/views/menu/index'),
        meta: { title: '全部菜谱' }
      },
      {
        path: '/burdenSheet',
        name: 'burdenSheet',
        component: () => import('@/views/burdenSheet/index'),
        meta: { title: '菜谱配料表' }
      }
    ]
  },
  {
    path: '/dailyMenu',
    component: Layout,
    meta: { title: '日常菜单', icon: '菜谱' },
    children: [
      {
        path: '/addDailyMenu',
        name: 'addDailyMenu',
        component: () => import('@/views/addDailyMenu/index'),
        meta: { title: '新增日常菜单' }
      },
      {
        path: '/dailyMenuAll',
        name: 'dailyMenuAll',
        component: () => import('@/views/dailyMenu/index'),
        meta: { title: '查看日常菜单' }
      }
    ]
  },
  {
    path: '/foodMaterial',
    component: Layout,
    children: [
      {
        path: 'foodMaterial',
        component: () => import('@/views/foodMaterial/index'),
        name: '食材材料',
        meta: {
          title: '食材进货',
          icon: '材料登记'
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
    path: '/comments',
    component: Layout,
    children: [
      {
        path: 'comments',
        meta: { title: '用户评论', icon: '订单' },
        name: 'comments',
        component: () => import('@/views/comments/index')
      }
    ]
  },
  {
    path: '/publicity',
    component: Layout,
    children: [
      {
        path: 'publicity',
        meta: { title: '公示信息', icon: '订单' },
        name: 'publicity',
        component: () => import('@/views/publicity/index')
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
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
