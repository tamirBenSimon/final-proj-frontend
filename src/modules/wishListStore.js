import { wishListService } from '../services/wishList.service.js'

export default {
    state: {
        wishList: [],
        // WL_Counter: wishListService.getCounter()
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
            console.log('wishList123213123: ', wishList);
            state.wishList = wishList;
            console.log('state.wishList7777: ', state.wishList);
        },
        removeWishList(state, { userId }) {
            state.wishList = state.wishList.wishList.filter(cart => cart._id !== userId)
        },
        setCounterWL(state, { counterWL }) {
            state.WL_Counter = counterWL;
        },
        removeWishlistProduct(state, { productId }) {
            console.log('state.wishList: ', state.wishList);
            const idx = state.wishList.findIndex(currPoduct => currPoduct._id === productId)
            state.wishList.splice(idx, 1)
            console.log('state.wishList: ', state.wishList);
        }
    },
    actions: {
        async loadWishList(context, { userId }) {
            const wishList = await wishListService.getCurrWishList(userId);
            context.commit({ type: 'setwishList', wishList })
            return wishList;
        },
        async removewishList(context, { productId, userId }) {
            context.commit({ type: 'removeWishlistProduct', productId })
            const currWishlist = context.state;
            console.log('currWishlist: ', currWishlist);
            await wishListService.remove(currWishlist, userId);
            context.commit({ type: 'removeWishList', userId })
                // const counterWL = await wishListService.getCounter();
                // context.commit({ type: 'setCounterWL', counterWL })
        },
        async addToWishList(context, { userId, product }) {
            await wishListService.addToCurrWishList(userId, product);
            // const counterWL = await wishListService.getCounter();
            // context.commit({ type: 'setCounterWL', counterWL })
        },
    }
}