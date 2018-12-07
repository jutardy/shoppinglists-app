import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
        },
        {
            path: '/about',
            name: 'About',
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
        },
        {
            path: '/shoppinglist/:userId?',
            name: 'ShoppingList',
            component: () => import(/* webpackChunkName: "shoppinglist" */ './views/ShoppingList.vue')
        },
        {
            path: '/documentation',
            name: 'Documentation',
            component: () => import(/* webpackChunkName: "documentation" */ './views/Documentation.vue')
        },
        {
            path: '*',
            name: 'PageNotFound',
            component: () => import(/* webpackChunkName: "pagenotfound" */ './views/PageNotFound.vue') }
    ]
});
