import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VuePictureSwipe from 'vue-picture-swipe';
Vue.component('vue-picture-swipe', VuePictureSwipe);

import './registerServiceWorker';
import './styles/global.scss';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')