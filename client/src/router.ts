import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import { isHaveStorage } from './util/storage';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // 首页
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    // 个人页
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    // 登陆页
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import(/* webpackChunkName: "about" */ './views/Edit.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { path: toPath } = to;
  if (!isHaveStorage('token') && toPath !== '/login') {
    next('/login');
  } else {
    next();
  }
});

export default router;
