import { utilService } from './util.service.js'
import { storageService } from './storage.service.js'
import httpService from './HttpService.js'

const KEY = 'usersDB'

var gUsers = _createUsers();

function _createUsers() {
    var users = storageService.load(KEY)
    if (!users || !users.length) {
        users = [
            _createUser({
                _id: 101,
                fullName: "ariel zissu",
                userName: "ariel",
                password: "123",
                isAdmin: true,
                bio: "Hello everyone, I played basketball",
                wishlist: [],
                imgUrl: `https://i.picsum.photos/id/542/200/250.jpg`,
                createdAt: 1521656526000,
            }),
            _createUser({
                _id: 102,
                fullName: "vlad indikt",
                userName: "shuki@gmail.com",
                password: "shuki444",
                isAdmin: false,
                bio: "hey my friends!!!",
                wishlist: [],
                imgUrl: `https://i.picsum.photos/id/552/200/250.jpg`,
                createdAt: 1490120526000,
            }),
            _createUser({
                _id: 103,
                fullName: "tamir ben simom",
                userName: "puki@ealla.com",
                password: "puki143",
                isAdmin: false,
                bio: "In 1993 I fucking born!",
                wishlist: [],
                imgUrl: `https://i.picsum.photos/id/562/200/250.jpg`,
                createdAt: 1426962126000,
            }),
        ]
        storageService.store(KEY, users)
    }
    return users;
}

function _createUser(user) {
    // user._id = utilService.makeId()
    return user;
}

function query(filterBy = null) {
    // return Promise.resolve(gUsers);

    var queryParams = new URLSearchParams()
    for (let key in filterBy) {
        if (filterBy[key]) queryParams.set(`${key}`, filterBy[key])
        const users = httpService.get(`user/?${queryParams}`);
        return Promise.resolve(users)
    }
}
//102
function getById(userId) {
    const currUser = gUsers.find(user => user._id === userId)
    return Promise.resolve(currUser)
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


function remove(userId) {
    const idx = gUsers.findIndex(user => user._id === userId)
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

async function login(userCred) {
    const currUser = gUsers.find(user => user.userName === userCred.userName && user.password === userCred.password)
    if (currUser) {
        _handleLogin(currUser)
    } else return null;
    // const user = await HttpService.post('auth/login', userCred)
}

// async function signup(userCred) {
//     const user = await HttpService.post('auth/signup', userCred)
//     return _handleLogin(user)
// }

async function signup(userCred) {
    _handleLogin(userCred)
    return userCred;
}

function logout() {
    // async function logout() {
    // await HttpService.post('auth/logout');
    sessionStorage.clear();
}

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}

export const userService = {
    query,
    getById,
    saveUser,
    remove,
    getEmptyUser,
    getNextPrevUserIds,
    login,
    logout,
    signup
}