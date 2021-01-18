import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Professors from '../views/ProfessorsIndex.vue';
import ProfessorShow from '../views/ProfessorShow.vue';
import ProfessorEdit from '../views/ProfessorEdit.vue';
import ProfessorCreate from '../views/ProfessorCreate.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/professors',
    name: 'Professors',
    component: Professors
  },
  {
    path: '/professors/:id',
    name: 'ProfessorShow',
    component: ProfessorShow
  },
  {
    path: '/professors/:id/edit',
    name: 'Professor-edit',
    component: ProfessorEdit
  },
  {
    path: '/professorsNew',
    name: 'ProfessorCreate',
    component: ProfessorCreate
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
