import { orderService } from "../services/order.service"


export default {
    state: {
        orders: []

    },
    getters: {
        orders(state) {
            return state.orders
        }
    },
    mutations: {
        setOrders(state, {orders}) {
            state.orders = orders;
        }

    },
    actions: {
        async loadAllOrders(context) {
            const orders = await orderService.query();
            context.commit({ type: 'setAllOrders', orders })
            return Promise.resolve(orders);
        },
        async loadSellerOrders(context, {sellerId}) {
            const orders = await orderService.query(sellerId);
            context.commit({ type: 'setOrders', orders })
            return Promise.resolve(orders);
        }
 
    }
}