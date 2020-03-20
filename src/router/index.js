import Vue from 'vue';
import VueRouter from 'vue-router';
import marketApp from '../views/market-app.page';
import admin from '../views/admin.page';
import details from '../views/product-details.page';

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'market-app',
        component: marketApp
    },
    {
        path: '/admin',
        name: 'admin-page',
        component: admin
    },
    {
        path: '/:id',
        name: 'details',
        component: details
    },
]

const router = new VueRouter({
    routes
})

export default router