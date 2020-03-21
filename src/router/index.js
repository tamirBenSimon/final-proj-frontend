import Vue from 'vue';
import VueRouter from 'vue-router';
import marketApp from '../views/market-app.page';
import home from '../views/home.page';
import loginSignup from '../views/login-signup-page';
import admin from '../views/admin.page';
import details from '../views/product-details.page';
import cart from '../views/cart.page';



Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/artwork',
        name: 'market-app',
        component: marketApp
    },
    {
        path: '/admin',
        name: 'admin-page',
        component: admin
    },
    {
        path: '/artwork/:id',
        name: 'details',
        component: details
    },
    {
        path: '/login',
        component: loginSignup
    },
    {
        path: '/signup',
        component: loginSignup
    },
    {
        path: '/cart',
        component: cart
    }
]

const router = new VueRouter({
    routes
})

export default router