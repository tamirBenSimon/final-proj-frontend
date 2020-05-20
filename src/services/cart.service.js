import { storageService } from './storage.service.js'

const KEY = 'cartDB';

var gCarts = storageService.load(KEY);
if (!gCarts || !gCarts.length) gCarts = [];


function getCurrCart(userId) {
    const currCart = gCarts.find(cart => cart.userId === userId);
    if (!currCart){
        const newCart = { userId, cart: [] };
        gCarts.push(newCart);
        storageService.store(KEY, gCarts)
        return newCart;
    }
    return currCart.cart;
}

function addToCurrCart(userId, product) {
    const currIndex = gCarts.findIndex(cart => cart.userId === userId);
    if (currIndex === -1) {
        const newCart = { userId, cart: [product] };
        gCarts.push(newCart);
    } else {
        var currCart = gCarts[currIndex];
        currCart.cart.push(product);
        gCarts.splice(currIndex, 1, currCart)
    }
    storageService.store(KEY, gCarts);
    return currCart;
}

function remove(productId, userId) {
    const currIndex = gCarts.findIndex(cart => cart.userId === userId);
    if (currIndex === -1) {
        return null;
    } else {
        var currCart = gCarts[currIndex].cart;
        const productIdx = currCart.findIndex(product => product._id === productId)
        if (productIdx === -1) return null;
        currCart.splice(productIdx, 1);
    }
    storageService.store(KEY, gCarts);
    return gCarts;
}


export const cartService = {
    getCurrCart,
    addToCurrCart,
    remove
}