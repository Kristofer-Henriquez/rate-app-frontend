import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Professors from '../views/ProfessorsIndex.vue';
import ProfessorShow from '../views/ProfessorShow.vue';
import ProfessorEdit from '../views/ProfessorEdit.vue';
import ProfessorCreate from '../views/ProfessorCreate.vue';
import ReviewCreate from '../views/ReviewCreate.vue';

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
    path: '/professors/:id/reviewcreate',
    name: 'ReviewCreate',
    component: ReviewCreate,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
