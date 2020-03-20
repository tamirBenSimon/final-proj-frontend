import { utilService } from './util.service.js'
import { storageService } from './storage.service.js'
const KEY = 'artworksDB'

var gArtworks = _createArtworks();

function _createArtworks() {
    var artworks = storageService.load(KEY)
    if (!artworks || !artworks.length) {
        artworks = [
            _createArtwork({
                title: 'lost in peace',
                desc: 'very nice psychadelic picture',
                price: 59,
                inStock: true,
                createdBy: {
                    _id: 101,
                    fullName: 'ariel zissu',
                    imageURL: `https://i.picsum.photos/id/542/200/250.jpg`
                },
                imgURLs: [`https://i.picsum.photos/id/112/200/250.jpg`, `https://i.picsum.photos/id/113/200/250.jpg`],
                tags: ['psychedelic', 'calm', 'nature'],
                salesCount: 28,
                reviews: [{
                        Txt: "great ! i love it",
                        by: { fullName: 'vlad indikt', _id: 102, imgURL: `https://i.picsum.photos/id/552/200/250.jpg` },
                        rate: 4
                    },
                    {
                        Txt: "i bought it again! this time for my uncle!",
                        by: { fullName: 'tamir ben simom', _id: 103, imgURL: `https://i.picsum.photos/id/562/200/250.jpg` },
                        rate: 5
                    },
                ]
            }),
            _createArtwork({
                title: 'i Love Ibiza',
                desc: 'very nice psychadelic picture',
                price: 89,
                inStock: true,
                createdBy: {
                    _id: 101,
                    fullName: 'ariel zissu',
                    imageURL: `https://i.picsum.photos/id/542/200/250.jpg`
                },
                imgURLs: [`https://i.picsum.photos/id/116/200/250.jpg`, `https://i.picsum.photos/id/117/200/250.jpg`

                ],
                tags: ['psychedelic', 'calm', 'nature'],
                salesCount: 28,
                reviews: [{
                        Txt: "great ! i love it",
                        by: { fullName: 'vlad indikt', _id: 102, imgURL: `https://i.picsum.photos/id/552/200/250.jpg` },
                        rate: 4
                    },
                    {
                        Txt: "i bought it again! this time for my uncle!",
                        by: { fullName: 'tamir ben simom', _id: 103, imgURL: `https://i.picsum.photos/id/562/200/250.jpg` },
                        rate: 5
                    },
                ]
            }),
            _createArtwork({
                title: 'beautiful art',
                desc: 'you want to buy this',
                price: 899,
                inStock: false,
                createdBy: { fullName: 'vlad indikt', _id: 102, imgURL: `https://i.picsum.photos/id/552/200/250.jpg` },
                imgURLs: [`https://i.picsum.photos/id/120/200/250.jpg`, `https://i.picsum.photos/id/121/200/250.jpg`],
                tags: ['fantasy', 'urban', 'nature'],
                salesCount: 2,
                reviews: [{
                        Txt: "great ! i love it",
                        _id: 101,
                        fullName: 'ariel zissu',
                        imageURL: `https://i.picsum.photos/id/542/200/250.jpg`,
                        rate: 2
                    },
                    {
                        Txt: "too expensive!",
                        by: { fullName: 'tamir ben simom', _id: 103, imgURL: `https://i.picsum.photos/id/562/200/250.jpg` },
                        rate: 3
                    },
                ]
            }),
            _createArtwork({
                title: 'breathe in the corona',
                desc: 'i started drawing in age 10, and for the past 20 years i make a new piece each weak. this is my favourite',
                price: 89,
                inStock: true,
                createdBy: { fullName: 'vlad indikt', _id: 102, imgURL: `https://i.picsum.photos/id/552/200/250.jpg` },
                imgURLs: [`https://i.picsum.photos/id/78/200/250.jpg`, `https://i.picsum.photos/id/79/200/250.jpg`],
                tags: ['modern', 'urban', 'nature'],
                salesCount: 2,
                reviews: [{
                        Txt: "it's the best one ! i love it",
                        _id: 101,
                        fullName: 'ariel zissu',
                        imageURL: `https://i.picsum.photos/id/542/200/250.jpg`,
                        rate: 5
                    },
                    {
                        Txt: "haimon limon!",
                        by: { fullName: 'tamir ben simom', _id: 103, imgURL: `https://i.picsum.photos/id/562/200/250.jpg` },
                        rate: 5
                    },
                ]
            }),            _createArtwork({
                title: 'go take a walk',
                desc: 'i am home for 2 weaks and want to take a walk',
                price: 29,
                inStock: true,
                createdBy: { fullName: 'vlad indikt', _id: 102, imgURL: `https://i.picsum.photos/id/552/200/250.jpg` },
                imgURLs: [`https://i.picsum.photos/id/65/200/250.jpg`, `https://i.picsum.photos/id/64/200/250.jpg`],
                tags: ['light-play', 'angles', 'family'],
                salesCount: 51,
                reviews: [{
                        Txt: "great artist but this one... not so much",
                        _id: 101,
                        fullName: 'ariel zissu',
                        imageURL: `https://i.picsum.photos/id/542/200/250.jpg`,
                        rate: 2
                    },
                    {
                        Txt: "too expensive!",
                        by: { fullName: 'tamir ben simom', _id: 103, imgURL: `https://i.picsum.photos/id/562/200/250.jpg` },
                        rate: 1
                    },
                ]
            }),            _createArtwork({
                title: 'beautiful art',
                desc: 'you want to buy this',
                price: 899,
                inStock: false,
                createdBy: { fullName: 'vlad indikt', _id: 102, imgURL: `https://i.picsum.photos/id/552/200/250.jpg` },
                imgURLs: [`https://i.picsum.photos/id/61/200/250.jpg`, `https://i.picsum.photos/id/63/200/250.jpg`,`https://i.picsum.photos/id/60/200/250.jpg`],
                tags: ['fantasy', 'urban', 'nature'],
                salesCount: 17,
                reviews: [{
                        Txt: "this is a review wrote by ariel",
                        _id: 101,
                        fullName: 'ariel zissu',
                        imageURL: `https://i.picsum.photos/id/542/200/250.jpg`,
                        rate: 2
                    },
                    {
                        Txt: "this is a review wrote by tamir",
                        by: { fullName: 'tamir ben simom', _id: 103, imgURL: `https://i.picsum.photos/id/562/200/250.jpg` },
                        rate: 3
                    },
                ]
            }),            _createArtwork({
                title: 'the life, of muki',
                desc: 'you want to buy this',
                price: 899,
                inStock: false,
                createdBy: { fullName: 'vlad indikt', _id: 102, imgURL: `https://i.picsum.photos/id/552/200/250.jpg` },
                imgURLs: [`https://i.picsum.photos/id/120/200/250.jpg`, `https://i.picsum.photos/id/121/200/250.jpg`],
                tags: ['fantasy', 'urban', 'nature'],
                salesCount: 12,
                reviews: [{
                        Txt: "I am in sprint 4, talk later!",
                        _id: 101,
                        fullName: 'ariel zissu',
                        imageURL: `https://i.picsum.photos/id/542/200/250.jpg`,
                        rate: 2
                    },
                    {
                        Txt: "muki is the best!",
                        by: { fullName: 'tamir ben simom', _id: 103, imgURL: `https://i.picsum.photos/id/562/200/250.jpg` },
                        rate: 3
                    },
                ]
            }),
        ]
        storageService.store(KEY, artworks)
    }
    return artworks
}

function _createArtwork(artwork) {
    artwork._id = utilService.makeId()
    return artwork;
}

function query() {
    return Promise.resolve(gArtworks);
}

async function getById(artworkId) {
    let artwork = gArtworks.find(artwork => artwork._id === artworkId)
    return Promise.resolve(artwork)
}


function saveArtwork(artwork) {
    if (artwork.id) return _updateArtwork(artwork)
    else return _addArtwork(artwork);
}

function _addArtwork(artwork) {
    artwork.id = utilService.makeId()
    artwork.push(artwork);
    storageService.store(KEY, artwork)
    return Promise.resolve(artwork)
}

function _updateArtwork(artwork) {
    const idx = artwork.findIndex(currrAtwork => currrAtwork.id === artwork.id);
    artwork.splice(idx, 1, artwork)
    storageService.store(KEY, artwork)
    return Promise.resolve(artwork)
}


function removeArtwork(artworkId) {
    console.log(artworkId)
    const idx = gArtworks.findIndex(artwork => artwork._id === artworkId)
    console.log(idx)
    if (idx === -1) return Promise.reject('DID NOT REMOVE artwork')
    gArtworks.splice(idx, 1);
    storageService.store(KEY, gArtworks)
    return Promise.resolve('artwork REMOVED')
}


function getEmptyArtwork() {
    var emptyartwork = {
        vendor: '',
        color: '#ff0000',
        speed: 20,
        createdAt: '',
        isAuto: true,
        ownershipType: '',
        seatsCount: 5,
        desc: '',
        features: []
    }
    return emptyartwork;
}

function getNextPrevartworkIds(artworkId) {
    const idx = gArtworks.findIndex(artwork => artwork.id === artworkId)

    var nextIdx = idx + 1;
    if (nextIdx === gArtworks.length) nextIdx = 0;
    var prevIdx = idx - 1;
    if (prevIdx < 0) prevIdx = gArtworks.length - 1;

    return {
        prevId: gArtworks[prevIdx].id,
        nextId: gArtworks[nextIdx].id,
    }
}

// CRUDL - Create, Read, Update, Delete, List
export const artworkService = {
    query,
    getById,
    saveArtwork,
    removeArtwork,
    getEmptyArtwork,
    getNextPrevartworkIds
}