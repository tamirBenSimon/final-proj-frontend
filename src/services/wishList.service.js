// import { storageService } from './storage.service.js'
// import { utilService } from './util.service.js'
import HttpService from './HttpService.js'

// const KEY = 'wishListDB';
// const COUNTER_KEY = 'WL_counterDB';

// var gwishLists = storageService.load(KEY);
// if (!gwishLists || !gwishLists.length) gwishLists = [];

// var gWLCounter = storageService.load(COUNTER_KEY);
// if (!gwishLists) gWLCounter = 0;

function getCurrWishList(userId) {
    // if (!gwishLists) return null;
    // const currWishList = gwishLists.find(wishList => wishList.userId === userId);
    // if (!currWishList) return null;
    // return currWishList;
    const wishlist = HttpService.get(`wishlist/${userId}`);
    return wishlist;
}

function addToCurrWishList(userId, product) {
    // console.log('userId !!! ', userId);
    // const currIndex = gwishLists.findIndex(wishList => wishList.userId === userId);
    // if (currIndex === -1) {
    //     const newWishList = { userId, wishList: [product] };
    //     gwishLists.push(newWishList);
    // } else {
    //     var currWishList = gwishLists[currIndex];
    //     currWishList.wishList.push(product);
    // }
    // gWLCounter++;
    // storageService.store(COUNTER_KEY, gWLCounter);
    // storageService.store(KEY, gwishLists);
    // return currWishList;
    return HttpService.put(`wishlist/${userId}`, product)
}

function remove(productId, userId) {
    // const currIndex = gwishLists.findIndex(wishList => wishList.userId === userId);
    // if (currIndex === -1) {
    //     return null;
    // } else {
    //     var currWishList = gwishLists[currIndex].wishList;
    //     const productIdx = currWishList.findIndex(product => product._id === productId)
    //     if (productIdx === -1) return null;
    //     currWishList.splice(productIdx, 1);
    // }
    // gWLCounter--;
    // storageService.store(COUNTER_KEY, gWLCounter);
    // storageService.store(KEY, gwishLists);
    // return gwishLists;

    console.log('productId', productId);
    console.log('userId', userId);

    return HttpService.delete(`wishlist/?userId=${userId}&productId=${productId}`)
}

// function getCounter() {
//     return gWLCounter;
// }


export const wishListService = {
    getCurrWishList,
    addToCurrWishList,
    remove,
    // getCounter

}


// import HttpService from './HttpService.js'

// export default {
//     query,
//     getUsers,
//     getById,
//     remove,
//     update
// }

// function query() {
//     const users = HttpService.get('user');
//     return Promise.resolve(users)
// }

// function getById(userId) {
//     return HttpService.get(`user/${userId}`)
// }

// function remove(userId) {
//     return HttpService.delete(`user/${userId}`)
// }

// function update(user) {
//     return HttpService.put(`user/${user._id}`, user)
// }

// function getUsers() {
//     return HttpService.get('user')
// }