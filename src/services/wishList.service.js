import HttpService from './HttpService.js'

function getCurrwishlist(userId) {
    const wishlist = HttpService.get(`wishlist/${userId}`);
    return wishlist;
}

function addToCurrwishlist(userId, product) {
    return HttpService.put(`wishlist/${userId}`, product)
}

function remove(productId, userId) {
    return HttpService.delete(`wishlist/${userId}`, { productId, userId })
}


export const wishlistService = {
    getCurrwishlist,
    addToCurrwishlist,
    remove,
}