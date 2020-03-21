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
    },
    actions: {
        async loadwishList(context, { userId }) {
            const wishList = await wishListService.getCurrWishList(userId);
            context.commit({ type: 'setwishList', wishList })
            return wishList;
        },
        // async removeUser(context, { userId }) {
        //     await wishListService.remove(userId);
        //     context.commit({ type: 'removeUser', userId })
        // },
        async addToWishList(context, { userId, product }) {
            await wishListService.addToCurrWishList(userId, product);
        }
    }
}