import Vue from 'vue';
import Router from 'vue-router';
import About from '@/views/About';
import Documentation from '@/views/Documentation';
import Home from '@/views/Home';
import Login from '@/views/Login';
import Register from '@/views/Register';
import ShoppingList from '@/views/ShoppingList';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/register',
            name: 'Register',
            // component: Register            
            component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
        },
        {
            path: '/login',
            name: 'Login',
            // component: Login
            component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
        },
        {
            path: '/shoppinglist',
            name: 'ShoppingList',
            component: () => import(/* webpackChunkName: "shoppinglist" */ './views/ShoppingList.vue')
        },
        {
            path: '/documentation',
            name: 'Documentation',
            component: () => import(/* webpackChunkName: "documentation" */ './views/Documentation.vue')
        }
    ]
});
