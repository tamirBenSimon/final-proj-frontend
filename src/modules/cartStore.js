import { cartService } from '../services/cart.service.js'


export default {
    state: {
        // loggedinUser: localLoggedinUser,
        // users: []
    },
    getters: {
        // users(state) {
        //     return state.users;
        // },
        // loggedinUser(state) {
        //     return state.loggedinUser
        // }
    },
    mutations: {
        // setUser(state, { user }) {
        //     state.loggedinUser = user;
        // },
        // setUsers(state, { users }) {
        //     state.users = users;
        // },
        // removeUser(state, { userId }) {
        //     state.users = state.users.filter(user => user._id !== userId)
        // },
    },
    actions: {
        // async login(context, { userCred }) {
        //     const user = await cartService.login(userCred);
        //     context.commit({ type: 'setUser', user })
        //     return user;
        // },
        // async signup(context, { userCred }) {
        //     const user = await cartService.signup(userCred)
        //     context.commit({ type: 'setUser', user })
        //     return user;

        // },
        // async logout(context) {
        //     await cartService.logout()
        //     context.commit({ type: 'setUsers', users: [] })
        //     context.commit({ type: 'setUser', user: null })
        // },
        // async loadUsers(context) {
        //     console.log('in store!!!');
        //     const users = await cartService.query();
        //     context.commit({ type: 'setUsers', users })
        //     return users;
        // },
        // async removeUser(context, { userId }) {
        //     await cartService.remove(userId);
        //     context.commit({ type: 'removeUser', userId })
        // },
        // async updateUser(context, { user }) {
        //     user = await cartService.update(user);
        //     context.commit({ type: 'setUser', user })
        //     return user;
        // }
    }
}