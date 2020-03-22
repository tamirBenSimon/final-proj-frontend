import { wishListService } from '../services/wishList.service.js'

export default {
    state: {
        wishList: [],
        WL_Counter: wishListService.getCounter()
    },
    getters: {
        wishList(state) {
            return state.wishList;
        },
        WL_Counter(state) {
            return state.WL_Counter;
        },
    },
    mutations: {
        setwishList(state, { wishList }) {
            state.wishList = wishList;
        },
        removeWishList(state, { userId }) {
            state.wishList = state.wishList.wishList.filter(cart => cart._id !== userId)
        },
        setCounterWL(state, { counterWL }) {
            state.WL_Counter = counterWL;
        }
    },
    actions: {
        async loadWishList(context, { userId }) {
            const wishList = await wishListService.getCurrWishList(userId);
            context.commit({ type: 'setwishList', wishList })
                // const counterWL = await wishListService.getCounter();
                // context.commit({ type: 'setCounterWL', counterWL })
            return wishList;
        },
        async removeWishList(context, { productId, userId }) {
            await wishListService.remove(productId, userId);
            context.commit({ type: 'removeWishList', userId })
            const counterWL = await wishListService.getCounter();
            context.commit({ type: 'setCounterWL', counterWL })
        },
        async addToWishList(context, { userId, product }) {
            await wishListService.addToCurrWishList(userId, product);
            const counterWL = await wishListService.getCounter();
            context.commit({ type: 'setCounterWL', counterWL })
        },
    }
}