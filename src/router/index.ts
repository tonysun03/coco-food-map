// 路由配置
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("@/views/index/index"),
  },
  {
    path: "/snacks",
    name: "snacks",
    component: () => import("@/views/snacks/index"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  next();
});

/**
 * @description 路由跳转错误
 * */
router.onError((error) => {
  console.warn("路由错误", error.message);
});

/**
 * @description 路由跳转结束
 * */
router.afterEach((to) => {});

export default router;
