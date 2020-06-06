import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import Login from '@/components/Login'
import SignUp from "@/components/SignUp";
import Market from "@/components/Market";
import Manage from "@/components/Manage";

Vue.use(Router);
Vue.use(Vuex);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/market',
      name: 'Market',
      component: Market
    },
    {
      path: '/manage',
      name: 'Manage',
      component: Manage
    }
  ]
})
