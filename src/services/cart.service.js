import { storageService } from './storage.service.js'
// import userStore from './modules/UserStore.js';

const KEY = 'cartDB';

var gCarts = storageService.load(KEY);
if (!gCarts || !gCarts.length) gCarts = [];


function getCurrCart(userId) {
    if (!gCarts) return null;
    const currCart = gCarts.find(cart => cart.userId === userId);
    if (!currCart) return null;
    return currCart;
}

function addToCurrCart(userId, product) {
    const currIndex = gCarts.findIndex(cart => cart.userId === userId);
    if (currIndex === -1) {
        const newCart = { userId, cart: [product] };
        gCarts.push(newCart);
    } else {
        var currCart = gCarts[currIndex];
        currCart.cart.push(product);
    }
    storageService.store(KEY, gCarts);
    return currCart;
}






export const cartService = {
    getCurrCart,
    addToCurrCart

}