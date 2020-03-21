import { cartService } from '../services/cart.service.js'


export default {
    state: {
        // loggedinUser: localLoggedinUser,
        cart: []
    },
    getters: {
        cart(state) {
            return state.cart;
        }
    },
    mutations: {
        setCart(state, { cart }) { ////// maybe change to product insatad of cart//////????????  
            state.cart = cart;
        },
        // removeUser(state, { userId }) {
        //     state.users = state.users.filter(user => user._id !== userId)
        // },
    },
    actions: {
        async loadcart(context, { userId }) {
            const cart = await cartService.getCurrCart(userId);
            context.commit({ type: 'setCart', cart })
            return cart;
        },
        // async removeUser(context, { userId }) {
        //     await cartService.remove(userId);
        //     context.commit({ type: 'removeUser', userId })
        // },
        async addToCart(context, { userId, product }) {
            console.log('userId:: ', userId);
            console.log('product:: ', product);
            await cartService.addToCurrCart(userId, product);
            // currCart = await cartService.addToCurrCart(userId, product);
            // context.commit({ type: 'setCurrCart', currCart })
            // return currCart;
        }
    }
}