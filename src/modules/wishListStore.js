import { wishListService } from '../services/wishList.service.js'

export default {
    state: {
        wishList: []
    },
    getters: {
        wishList(state) {
            return state.wishList;
        }
    },
    mutations: {
        setwishList(state, { wishList }) {
            state.wishListt = wishList;
        },
        removeWishList(state, { userId }) {
            state.wishList = state.wishList.wishList.filter(cart => cart._id !== userId)
        },
    },
    actions: {
        async loadWishList(context, { userId }) {
            const wishList = await wishListService.getCurrWishList(userId);
            context.commit({ type: 'setwishList', wishList })
            return wishList;
        },
        async removeWishList(context, { productId, userId }) {
            await wishListService.remove(productId, userId);
            context.commit({ type: 'removeWishList', userId })
        },
        async addToWishList(context, { userId, product }) {
            await wishListService.addToCurrWishList(userId, product);
        }
    }
}