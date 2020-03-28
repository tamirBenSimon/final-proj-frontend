import { wishlistService } from '../services/wishlist.service.js'

export default {
    state: {
        wishlist: [],
        WL_Counter: 0
    },
    getters: {
        wishlist(state) {
            return state.wishlist;
        },
        WL_Counter(state) {
            return state.wishlist.length;
        },
    },
    mutations: {
        setwishlist(state, { wishlist }) {
            state.wishlist = wishlist[0].wishlist;
        },
        removeWishlistProduct(state, { productId }) {
            const idx = state.wishlist.findIndex(currPoduct => currPoduct._id === productId)
            state.wishlist.splice(idx, 1)
        },
        addWishlistProduct(state, { product }) {
            state.wishlist.push(product)
        }
    },
    actions: {
        async loadWishlist(context, { userId }) {
            const wishlist = await wishlistService.getCurrwishlist(userId);
            context.commit({ type: 'setwishlist', wishlist })
        },
        async removeFromWishlist(context, { productId, userId }) {
            await wishlistService.remove(productId, userId);
            context.commit({ type: 'removeWishlistProduct', productId })
        },
        async addToWishlist(context, { userId, product }) {
            await wishlistService.addToCurrwishlist(userId, product);
            context.commit({ type: 'addWishlistProduct', product })
        }
    }
}