import { userService } from '../services/user.service.js'

var localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

export default {
    state: {
        selectedUser: null,
        loggedinUser: localLoggedinUser,
        users: []
    },
    getters: {
        users(state) {
            return state.users;
        },
        loggedinUser(state) {
            return state.loggedinUser
        },
        selectedUser(state) {
            return state.selectedUser
        },
    },
    mutations: {
        setUser(state, { user }) {
            state.loggedinUser = user;
        },
        setSelectedUser(state, { user }) {
            state.selectedUser = user;
        },
        setUsers(state, { users }) {
            state.users = users;
        },
        removeUser(state, { userId }) {
            state.users = state.users.filter(user => user._id !== userId)
        },
        setLoggedinUser(state) {
            state.loggedinUser = null;
        }
    },
    actions: {
        async login(context, { userCred }) {
            const user = await userService.login(userCred);
            context.commit({ type: 'setUser', user })
            return user;
        },
        async signup(context, { userCred }) {
            const user = await userService.signup(userCred)
            context.commit({ type: 'setUser', user })
            return user;

        },
        async logout(context) {
            await userService.logout()
            context.commit({ type: 'setLoggedinUser', users: [] })
                // context.commit({ type: 'setUsers', users: [] })
                // context.commit({ type: 'setUser', user: null })
        },
        async loadUsers(context) {
            const users = await userService.query();
            context.commit({ type: 'setUsers', users })
            return users;
        },
        async loadUser(context, { userId }) {
            console.log('in store!!!');
            const user = await userService.getById(userId);
            context.commit({ type: 'setUser', user })
            context.commit({ type: 'setSelectedUser', user })
            return user;
        },
        async removeUser(context, { userId }) {
            await userService.remove(userId);
            context.commit({ type: 'removeUser', userId })
        },
        async updateUser(context, { user }) {
            user = await userService.update(user);
            context.commit({ type: 'setUser', user })
            return user;
        }
    }
}