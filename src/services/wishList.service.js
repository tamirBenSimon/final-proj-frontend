import { storageService } from './storage.service.js'

const KEY = 'wishListDB';

var gwishLists = storageService.load(KEY);
if (!gwishLists || !gwishLists.length) gwishLists = [];


function getCurrWishList(userId) {
    if (!gwishLists) return null;
    const currWishList = gwishLists.find(wishList => wishList.userId === userId);
    if (!currWishList) return null;
    return currWishList;
}

function addToCurrWishList(userId, product) {
    const currIndex = gwishLists.findIndex(wishList => wishList.userId === userId);
    if (currIndex === -1) {
        const newWishList = { userId, wishList: [product] };
        gwishLists.push(newWishList);
    } else {
        var currWishList = gwishLists[currIndex];
        currWishList.wishList.push(product);
    }
    storageService.store(KEY, gwishLists);
    return currWishList;
}

export const wishListService = {
    getCurrWishList,
    addToCurrWishList

}