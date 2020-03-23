import { orderService } from "../services/order.service"


export default {
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {
        async loadOrders(context) {
            const orders = await orderService.query();
            context.commit({ type: 'setOrders', orders })
            return Promise.resolve(orders);
        }
 
    }
}