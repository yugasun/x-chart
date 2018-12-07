import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import Index from '@/views/index/index.vue';

Vue.use(Router);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
];

export default new Router({
  routes,
});
