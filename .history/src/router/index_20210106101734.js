import Vue from "vue";
import Router from "vue-router";

import Layout from "@/views/layout/Layout";
Vue.use(Router);

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: "",
    redirect: "home",
    component: Layout,
    meta: { title: "首页", icon: "el-icon-house" },
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../views/Home.vue"),
        meta: { title: "首页", icon: "el-icon-house" }
      }
    ]
  },
  {
    path: "/pageDecoration",
    component: Layout,
    redirect: "/pageDecoration/tourtips",
    meta: { title: "页面装修", icon: "el-icon-s-tools" },
    children: [
      {
        path: "/tourtips",
        name: "tourtips",
        component: () => import("../views/pageDecoration/Tourtips"),
        meta: { title: "游贴士" }
      },
      {
        path: "/article",
        name: "article",
        component: () => import("../views/pageDecoration/Article"),
        meta: { title: "文章" }
      }
    ]
  },
  {
    path: "/configuration",
    component: Layout,
    redirect: "/configuration/nginx",
    meta: { title: "配置", icon: "el-icon-s-goods" },
    children: [
      {
        path: "/nginx",
        name: "nginx",
        component: () => import("../views/configuration/NodeAndNginx.vue"),
        meta: { title: "nginx配置" }
      },
      {
        path: "/koa",
        name: "koa",
        component: () => import("../views/configuration/NodeAndKoa.vue"),
        meta: { title: "koa配置" }
      },
      {
        path: "/vscode",
        name: "vascode",
        component: () => import("../views/configuration/VscodeAndSFTP"),
        meta: { title: "vscode连接远程" }
      }
    ]
  },
  {
    path: "/frame",
    component: Layout,
    redirect: "/frame/vue",
    meta: { title: "框架", icon: "el-icon-menu" },
    children: [
      {
        path: "/react",
        name: "react",
        component: () => import("../views/frame/react.vue"),
        meta: { title: "react" }
      },
      {
        path: "/koa2",
        name: "koa2",
        component: () => import("../views/frame/koa2.vue"),
        meta: { title: "koa2" }
      }
    ]
  },
  {
    path: "/stack",
    component: Layout,
    redirect: "/stack/ES6",
    meta: { title: "技术栈", icon: "el-icon-menu" },
    children: [
      {
        path: "/Iterator",
        name: "Iterator",
        component: () => import("../views/stack/ES6/Iterator.vue"),
        meta: { title: "迭代器" }
      },
      {
        path: "/Proxy",
        name: "/Proxy",
        component: () => import("../views/stack/ES6/Proxy.vue"),
        meta: {title: "代理"}
      }
    ]
  },
  {
    path: "/interview",
    component: Layout,
    redirect: "/interview/navigator",
    meta: { title: "面试题汇总", icon: "el-icon-menu" },
    children: [
      {
        path: "/navigator",
        name: "navigator",
        component: () => import("../views/interview/Navigator.vue"),
        meta: { title: "navigator" }
      },
      {
        path: "/javascript",
        name: "javascript",
        component: () => import("../views/interview/JavaScript.vue"),
        meta: { title: "javascript" }
      },
      {
        path: "/html5",
        name: "html5",
        component: () => import("../views/interview/Html5.vue"),
        meta: { title: "html5" }
      },
      {
        path: "/vue",
        name: "vue",
        component: () => import("../views/interview/Vue.vue"),
        meta: { title: "vue" }
      },
    ]
  },
  {
    path: "/fabric",
    name: 'fabric',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/fabric/index.vue'),
    meta: { title: "fabric绘图"},
  },
  {
    path: "/htmlPoster",
    name: 'htmlPoster',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/fabric/demo.vue'),
    meta: { title: "htmlPoster"},
  },
  {
    path: "/about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Layout,
    meta: { title: "关于", icon: "el-icon-phone" },
    children: [
      {
        path: "/about",
        name: "about",
        component: () => import("../views/About.vue"),
        meta: { title: "关于" }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  /** When your routing table is too long, you can split it into small modules**/
  { path: '*', redirect: '/404', hidden: true }
]
