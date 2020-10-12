import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const ItemView = () => import('../views/ItemView.vue');
const UserView = () => import('../views/UserView.vue');
const LoginView = () => import('../views/LoginView.vue');
const NavView = () => import('../views//navigation.vue');

export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/item', component: ItemView },
      { path: '/user', component: UserView },
      { path: '/login', component: LoginView },
      { path: '/navigation', component: NavView },
      { path: '/', redirect: '/item' }
    ]
  })
}
