import { cartService } from '../services/cart.service.js'

export default {
    state: {
        cart: [],
    },
    getters: {
        cart(state) {
            return state.cart;
        },
        cartCounter(state) {
            console.log("cart added counter!")
            return state.cart.length;
        },
    },
    mutations: {
        setCart(state,  {cart} ) {
            state.cart = cart;
            console.log("state cart: ", state.cart)
            console.log("data cart: ", cart)
        },
        removeProduct(state, { userId }) {
            state.cart = state.cart.cart.filter(cart => cart._id !== userId)
        },
    },
    actions: {
        async loadCart(context, { userId }) {

            const cart = await cartService.getCurrCart(userId);
            console.log('cart in cart store ', cart)
            context.commit({ type: 'setCart', cart })
            return cart;
        },
        async removeCart(context, { productId, userId }) {
            await cartService.remove(productId, userId);
            context.commit({ type: 'removeProduct', userId })
        },
        async addToCart(context, { userId, product }) {
            const cart = await cartService.addToCurrCart(userId, product)
            context.commit({ type: 'setCart', cart })
        }
    }
}