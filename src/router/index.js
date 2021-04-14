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
    path: '/',
    name: 'Home',
    component: () => import('@/views/library/Home'),
    redirect: '/page',
    children: [
      {
        path: '/page',
        component: () => import('@/views/library/Billboard'),
        hidden: true
      },
      {
        path: '/library',
        component: () => import('@/views/library/index'),
        hidden: true
      },
      {
        path: '/admin',
        redirect: '/dashboard/dashboard',
        hidden: true
      },
      {
        path: '/index',
        name: 'AppIndex',
        component: () => import('@/views/library/AppIndex')
      }
    ]
  },
  {
    path: '/toHome',
    redirect: '/',
    component: Layout,
    children: [
      {
        path: '/',
        meta: { title: '返回图书平台', icon: 'link' }
      }
    ]
  },
  {
    path: '/dashboard',
    component: Layout,
    // redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '驾驶舱',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '驾驶舱', icon: 'dashboard' }
    }]
  },

  {
    path: '/favorite',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '收藏夹',
        component: () => import('@/views/favorite/index'),
        meta: { title: '收藏夹', icon: 'favorite' }
      }
    ]
  },

  // {
  //   path: '/personnalLog',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'personnalLog',
  //       component: () => import('@/views/personnalBorrow/index'),
  //       meta: { title: '个人借书记录', icon: 'card' }
  //     }
  //   ]
  // },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/bookManage',
    component: Layout,
    redirect: '/bookManage/book',
    name: '图书管理',
    meta: { title: '图书管理', icon: 'library' },
    children: [
      {
        path: 'book',
        name: 'book',
        component: () => import('@/views/table/index'),
        meta: { title: '图书详情', icon: 'library ', roles: ['admin', 'contentManager', 'parent', 'teacher'] }
      },
      {
        path: 'myBook',
        name: 'myBook',
        component: () => import('@/views/myBook/index'),
        meta: { title: '我的图书', icon: 'library ' }
      }
    ]
  },
  // {
  //   path: '/borrowLog',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'logDetail',
  //       component: () => import('@/views/borrowlog/index'),
  //       meta: { title: '借书日志管理', icon: 'log', roles: ['admin', 'contentManager'] }
  //     }
  //   ]
  // },
  {
    path: '/edu',
    component: Layout,
    redirect: '/edu/class',
    name: '教学中心',
    meta: { title: '教学中心', icon: 'edu1' },
    children: [
      {
        path: 'class',
        name: '班级管理',
        component: () => import('@/views/schoolClass/classIndex'),
        meta: { title: '班级管理', icon: 'classManage', roles: ['admin', 'teacher'] }
      },
      {
        path: 'user',
        name: '用户录入',
        meta: { title: '用户录入', icon: 'bindUser', roles: ['admin', 'teacher'] },
        component: () => import('@/views/schoolClass/classStudent')
      },
      {
        path: 'userInClass',
        name: '班级详情',
        meta: { title: '班级详情', icon: 'userInClass', roles: ['admin', 'teacher', 'student', 'parent'] },
        component: () => import('@/views/schoolClass/classInfo')
      },
      {
        path: 'readingReport',
        name: '阅读情况统计',
        meta: { title: '阅读情况统计', icon: 'report', roles: ['admin', 'teacher', 'student', 'parent', 'contentManager'] },
        component: () => import('@/views/schoolClass/readingReport')
      }
    ]
  },
  {
    path: '/regist',
    component: Layout,
    redirect: '/regist/user',
    name: '注册中心',
    meta: { title: '注册中心', icon: 'insertCenter' },
    children: [
      {
        path: 'user',
        name: '用户注册',
        component: () => import('@/views/registCenter/userRegist'),
        meta: { title: '用户注册', icon: 'user', roles: ['admin', 'contentManager'] }
      },
      {
        path: 'book',
        name: '图书上传',
        component: () => import('@/views/registCenter/bookUpload'),
        meta: { title: '图书上传', icon: 'bookRegist' }
      },
      {
        path: 'class',
        name: '班级注册',
        component: () => import('@/views/registCenter/classRegist'),
        meta: { title: '班级注册', icon: 'classManage1', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/log',
    component: Layout,
    meta: {
      title: '日志管理',
      icon: 'logManager'
    },
    children: [
      {
        path: 'personnalLog',
        component: () => import('@/views/personnalBorrow/index'),
        meta: { title: '个人借书日志', icon: 'card' }
      },
      {
        path: 'logDetail',
        meta: { title: '所有借书日志', icon: 'personal', roles: ['admin', 'contentManager'] },
        component: () => import('@/views/borrowlog/index')
      },
      {
        path: 'operateLog',
        meta: { title: '操作日志', icon: 'operateLog', roles: ['admin', 'contentManager'] },
        component: () => import('@/views/operatelog/index')
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    meta: {
      title: '用户管理',
      icon: 'userManage'
    },
    children: [
      {
        path: 'userInfo',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'userAdmin', roles: ['admin'] }
      },
      {
        path: 'personalInfo',
        meta: { title: '个人信息管理', icon: 'personal' },
        component: () => import('@/views/user/personalInfo')
      },
      {
        path: 'personalPoint',
        meta: { title: '积分明细', icon: 'loss' },
        component: () => import('@/views/user/point')
      }
    ]
  },
  {
    path: '/affair',
    component: Layout,
    meta: {
      title: '事务大厅',
      icon: 'affair'
    },
    children: [
      {
        path: 'addAffair',
        component: () => import('@/views/affair/index'),
        meta: { title: '新建事务', icon: 'addAffair' },
        children: [
          {
            path: 'overdue',
            meta: { title: '超期管理', icon: 'overDue' },
            component: () => import('@/views/affair/createAffair')

          },
          {
            path: 'broken',
            meta: { title: '损坏图书', icon: 'loss' },
            component: () => import('@/views/affair/brokenBook')
          },
          {
            path: 'applyBook',
            meta: { title: '申请购书', icon: 'loss' },
            component: () => import('@/views/affair/applyBook')
          }
        ]
      },
      {
        path: 'affairQueue',
        meta: { title: '流程审批', icon: 'loss' },
        component: () => import('@/views/affair/affairQueue')
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
