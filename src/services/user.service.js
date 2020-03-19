import { utilService } from './util.service.js'
import { storageService } from './storage.service.js'
const KEY = 'usersDB'

var gUsers = _createUsers();

function _createUsers() {
    var users = storageService.load(KEY)
    if (!users || !users.length) {
        users = [
            _createUser({
                _id: "u101",
                fullName: "ariel zissu",
                userName: "arielzissu@nike.com",
                password: "arielking123",
                isAdmin: true,
                bio: "Hello everyone, I played basketball",
                wishlist: [],
                imgUrl: `https://i.picsum.photos/id/542/200/250.jpg`,
                createdAt: 123234455445,
            }),
            _createUser({
                _id: "u102",
                fullName: "vlad indikt",
                userName: "shuki@gmail.com",
                password: "shuki444",
                isAdmin: false,
                bio: "hey my friends!!!",
                wishlist: [],
                imgUrl: `https://i.picsum.photos/id/552/200/250.jpg`,
                createdAt: 126564455421,
            }),
            _createUser({
                _id: "u103",
                fullName: "tamir ben simom",
                userName: "puki@ealla.com",
                password: "puki143",
                isAdmin: false,
                bio: "In 1993 I fucking born!",
                wishlist: [],
                imgUrl: `https://i.picsum.photos/id/562/200/250.jpg`,
                createdAt: 123676433474,
            }),
        ]
        storageService.store(KEY, users)
    }
    return Promise.resolve(users);
}

function _createUser(user) {
    user._id = utilService.makeId()
    return user;
}

function query() {
    return Promise.resolve(gUsers);
}

function getById(userId) {
    const user = gUsers.find(user => user.id === userId)
    return Promise.resolve(user)
}


function saveUser(user) {
    if (user.id) return _updateUser(user)
    else return _addUser(user);
}

function _addUser(user) {
    user.id = utilService.makeId()
    gUsers.push(user);
    storageService.store(KEY, gUsers)
    return Promise.resolve(gUsers)
}

function _updateUser(user) {
    const idx = gUsers.findIndex(currrAtwork => currrAtwork.id === user.id);
    gUsers.splice(idx, 1, user)
    storageService.store(KEY, gUsers)
    return Promise.resolve(gUsers)
}


function removeUser(userId) {
    const idx = gUsers.findIndex(user => user.id === userId)
    if (idx === -1) return Promise.reject('DID NOT REMOVE USER')
    gUsers.splice(idx, 1);
    storageService.store(KEY, gUsers)
    return Promise.resolve('user REMOVED')
}


function getEmptyUser() {
    var emptyUser = {
        _id: utilService.makeId(),
        fullName: "",
        userName: "",
        password: "",
        isAdmin: false,
        bio: "",
        wishlist: [],
        imgUrl: '',
        createdAt: Date.now(),

    }
    return emptyUser;
}

function getNextPrevUserIds(userId) {
    const idx = gUsers.findIndex(user => user.id === userId)

    var nextIdx = idx + 1;
    if (nextIdx === gUsers.length) nextIdx = 0;
    var prevIdx = idx - 1;
    if (prevIdx < 0) prevIdx = gUsers.length - 1;

    return {
        prevId: gUsers[prevIdx].id,
        nextId: gUsers[nextIdx].id,
    }
}

// CRUDL - Create, Read, Update, Delete, List
export const userService = {
    query,
    getById,
    saveUser,
    removeUser,
    getEmptyUser,
    getNextPrevUserIds
}