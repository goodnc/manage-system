import type { RouteRecordRaw } from "vue-router";
//定义动态路由，每个路由都需要映射到一个组件。
export const dynamicRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "/",
    component: () => import("@/components/layout/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/home.vue"),
        meta: {
          title: "仪表盘",
        },
      },
      {
        path: "/user",
        name: "user",
        component: () => import("@/components/layout/sub-parent.vue"),
        meta: {
          title: "用户管理",
        },
        redirect: "/user/user-list",
        children: [
          {
            path: "/user/user-list",
            name: "user-list",
            component: () => import("@/views/user/user-list.vue"),
            meta: {
              title: "用户列表",
            },
          },
        ],
      },
      {
        path: "/courser",
        name: "courser",
        component: () => import("@/components/layout/sub-parent.vue"),
        meta: {
          title: "课程管理",
        },
        redirect: "/courser/courser-list",
        children: [
          {
            path: "/courser/courser-list",
            name: "courser-list",
            component: () => import("@/views/course/course-list.vue"),
            meta: {
              title: "课程列表",
            },
          },
          {
            path: "/courser/courser-category",
            name: "courser-category",
            component: () => import("@/views/course/course-category.vue"),
            meta: {
              title: "课程分类",
            },
          },
        ],
      },
    ],
  },
];
//模拟从接口获取的菜单列表
const routeData: any = [];
// 获取views目录下的 .vue 全部文件
const viewsModules: any = import.meta.glob("../views/**/*.vue");
/**
 * 后端路由 component 转换
 * @param routes 后端返回的路由表数组
 * @returns 返回处理成函数后的 component
 */
function backEndComponent(routes: any) {
  if (!routes) return;
  return routes.map((item: any) => {
    if (!item.component && !["/"].includes(item.name)) {
      item.component = item.path + "/" + item.name;
    }
    item.component = getComponent(item.component); //viewsModules['../views/' + item.component + '.vue'];
    item.children && backEndComponent(item.children);
    return item;
  });
}
//根据path返回处理成函数后的 component
function getComponent(path: string) {
  if (typeof path == "string" && path.constructor == String) {
    return viewsModules["../views/" + path + ".vue"];
  }
  return path;
}
//初始化动态路由
export async function initBackEndControlRoutes() {
  dynamicRoutes[0].children = backEndComponent(routeData);
}
/**
 * 定义404界面
 */
export const notFoundRoute: RouteRecordRaw = {
  path: "/:path(.*)*",
  name: "notFound",
  component: () => import("@/views/error/404.vue"),
  meta: {
    title: "找不到对象",
    isHide: true,
  },
};
/**
 * 定义静态路由（默认路由）
 * @returns 返回路由菜单数据
 */
export const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
    meta: {
      title: "登录",
    },
  },
];
