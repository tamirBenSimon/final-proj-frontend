import Vue from 'vue'
import VueRouter from 'vue-router'
import marketApp from '../views/market-app.page'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'market-app',
    component: marketApp
}, ]

const router = new VueRouter({
    routes
})

export default router