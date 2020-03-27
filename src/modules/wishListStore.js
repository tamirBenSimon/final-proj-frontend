import { wishlistService } from '../services/wishlist.service.js'

export default {
    state: {
        wishlist: [],
        WL_Counter: [0]
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
        // setCounterWL(state, { currNum }) {
        //     let num = state.WL_Counter.unshift();
        //     console.log('num before: ', num);
        //     num += currNum;
        //     console.log('num result: ', num);
        //     state.WL_Counter.shift(num);
        // },
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
            console.log('inside wishlist store, printing "wishlist":', wishlist)
            context.commit({ type: 'setwishlist', wishlist })
        },
        async removeFromWishlist(context, { productId, userId }) {
            await wishlistService.remove(productId, userId);
            context.commit({ type: 'removeWishlistProduct', productId })
                // context.commit({ type: 'setCounterWL', currNum: -1 })
        },
        async addToWishlist(context, { userId, product }) {
            await wishlistService.addToCurrwishlist(userId, product);
            context.commit({ type: 'addWishlistProduct', product })
                // context.commit({ type: 'setCounterWL', currNum: 1 })
        }
    }
}