import Vue from 'vue'
import Vuex from 'vuex'


// import SocketStore from './modules/SocketStore.js'
// import ReviewStore from './modules/ReviewStore.js'
import userStore from './modules/UserStore.js'
import artworkStore from './modules/artworkStore.js'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    modules: {
        artworkStore,
        userStore
    },
    state: {

    },
    mutations: {

    },
    actions: {

    }
})