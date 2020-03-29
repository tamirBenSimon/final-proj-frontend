import userService from '../services/UserService.js'

var localLoggedinUser = { _id: '5e7a1a16988a6fe1b32ae3c6', fullName: 'Ariel Zissu', imgURL: 'https://www.placecage.com/c/200/300' };

export default {
    state: {
        selectedUser: null,
        loggedinUser: localLoggedinUser,
        users: []
    },
    getters: {
        users(state) {
            console.log('state.users is: ', state.users);
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
        },
        async loadUsers(context) {
            const users = await userService.query();
            context.commit({ type: 'setUsers', users })
            return users;
        },
        async loadUser(context, { userId }) {
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