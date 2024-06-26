import { RouteRecordRaw } from 'vue-router'

export const constantRoute: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
    meta: {
      title: '登陆',
      hidden: true,
      icon: 'Promotion',
    },
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'Layout',
    meta: {
      title: '',
      hidden: false,
      icon: '',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
      title: '数据大屏',
      hidden: false,
      icon: 'Platform',
    },
  },

  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: 'Crop',
    },
  },
]
//异步路由
export const asyncRoute: Array<RouteRecordRaw> = [
  {
    path: '/exam',
    component: () => import('@/layout/index.vue'),
    name: 'Exam',
    meta: {
      title: '备考指南',
      hidden: false,
      icon: 'Reading',
    },
    redirect: '/acl/search',
    children: [
      {
        path: '/acl/search',
        component: () => import('@/views/exam/search/index.vue'),
        name: 'Search',
        meta: {
          title: '题目检索',
          hidden: false,
          icon: 'Search',
        },
      },
      {
        path: '/acl/bank',
        component: () => import('@/views/exam/bank/index.vue'),
        name: 'Bank',
        meta: {
          title: '题库',
          hidden: false,
          icon: 'Notebook',
        },
      },
    ],
  },
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock',
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'UserFilled',
        },
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Monitor',
        },
      },
    ],
  },
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'Goods',
    },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'ShoppingCartFull',
        },
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          hidden: false,
          icon: 'ChromeFilled',
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          hidden: false,
          icon: 'Calendar',
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          hidden: false,
          icon: 'Orange',
        },
      },
    ],
  },
  {
    path: '/document',
    component: () => import('@/layout/index.vue'),
    name: 'Document',
    meta: {
      title: '参考文档',
      hidden: false,
      icon: 'Document',
    },
    redirect: '/document/element-plus',
    children: [
      {
        path: '/document/element-plus',
        component: () => import('@/views/document/element-plus/index.vue'),
        name: 'Element-Plus',
        meta: {
          title: 'element-plus',
          hidden: false,
          icon: 'Tickets',
        },
      },
      {
        path: '/document/vue',
        component: () => import('@/views/document/vue/index.vue'),
        name: 'Vue',
        meta: {
          title: 'Vue',
          hidden: false,
          icon: 'Tickets',
        },
      },
    ],
  },
  {
    path: '/background',
    component: () => import('@/layout/index.vue'),
    name: 'Background',
    meta: {
      title: '参考文档',
      hidden: false,
      icon: 'Document',
    },
    redirect: '/background/schedule',
    children: [
      {
        path: '/background/schedule',
        component: () => import('@/views/background/schedule/index.vue'),
        name: 'Schedule',
        meta: {
          title: '后台任务',
          hidden: false,
          icon: 'Tickets',
        },
      },
    ],
  },
]
//任意路由
export const anyRoute: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意',
      hidden: true,
      icon: 'QuestionFilled',
    },
  },
]
