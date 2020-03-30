import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VuePictureSwipe from 'vue-picture-swipe';
Vue.component('vue-picture-swipe', VuePictureSwipe);
import Cloudinary from 'cloudinary-vue';
Vue.use(Cloudinary, {
    configuration: {
        cloudName: "dsamb9nef"
    }
});

import ElementUI from 'element-ui'; //vue elementUI lib
import 'element-ui/lib/theme-chalk/index.css'; //vue elementUI lib

import './registerServiceWorker';
import './styles/global.scss';


Vue.use(ElementUI); //vue elementUI lib
Vue.config.productionTip = false;


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')