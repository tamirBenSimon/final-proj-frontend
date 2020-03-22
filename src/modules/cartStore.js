import { cartService } from '../services/cart.service.js'

export default {
    state: {
        cart: [],
        cartCounter: cartService.getCounter()
    },
    getters: {
        cart(state) {
            return state.cart;
        },
        cartCounter(state) {
            return state.cartCounter;
        },
    },
    mutations: {
        setCart(state, { cart }) {
            state.cart = cart;
        },
        removeProduct(state, { userId }) {
            state.cart = state.cart.cart.filter(cart => cart._id !== userId)
        },
        setCounterCart(state, { counterCart }) {
            state.cartCounter = counterCart;
        }
    },
    actions: {
        async loadCart(context, { userId }) {
            const cart = await cartService.getCurrCart(userId);
            context.commit({ type: 'setCart', cart })
            return cart;
        },
        async removeCart(context, { productId, userId }) {
            await cartService.remove(productId, userId);
            context.commit({ type: 'removeProduct', userId })
            const counterCart = await cartService.getCounter();
            context.commit({ type: 'setCounterCart', counterCart })
        },
        async addToCart(context, { userId, product }) {
            await cartService.addToCurrCart(userId, product);
            const counterCart = await cartService.getCounter();
            context.commit({ type: 'setCounterCart', counterCart })
        }
    }
}