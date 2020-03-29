import Vue from 'vue';
import VueRouter from 'vue-router';
import marketApp from '../views/market-app.page';
import home from '../views/home.page';
import loginSignup from '../views/login-signup-page';
import admin from '../views/admin.page';
import details from '../views/product-details.page';
import cart from '../views/cart.page';
import wishlist from '../views/wish-list.page';
import sellerGallery from '../views/seller-gallery.page';
import artworkEdit from '../views/artwork-edit.page';
import sellerCabinet from '../views/seller-cabinet.page';

Vue.use(VueRouter)

const routes = [{
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
    },
    {
        path: '/wishlist',
        component: wishlist
    },
    {
        path: '/sellerGallery/:id',
        component: sellerGallery
    },
    {
        path: '/artwork/edit/:id?',
        component: artworkEdit
    },

    {
        path: '/cabinet/:id',
        component: sellerCabinet
    }
]

const router = new VueRouter({
    routes
})

export default router