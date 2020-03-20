import Vue from 'vue'
import VueRouter from 'vue-router'
import marketApp from '../views/market-app.page'
import loginSignup from '../views/login-signup-page'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'market-app',
    component: marketApp
},
{
    path: '/login',
    component: loginSignup
},
{
    path: '/signup',
    component: loginSignup
} ]

const router = new VueRouter({
    routes
})

export default router