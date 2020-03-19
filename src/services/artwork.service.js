import {utilService} from './util.service.js'
import {storageService} from './storage.service.js'
const KEY = 'artworksDB'

var artwork = _createArtworks();   

function _createArtworks() {
    var artwork = storageService.load(KEY)
    if (!artwork || !artwork.length) {
        artwork = [_createArtwork
        ('Audu'), _createArtwork
    ('Suzupi')]
        storageService.store(KEY, artwork)
    }
    return artwork;
}

function _createArtwork(vendor) {
    return {
        id: utilService.makeId(),
        vendor,
        speed: utilService.getRandomInt(100, 300)
    } 
}

function query() {
    return Promise.resolve(artwork);
}

function getById(artworkId){
    const artwork = artwork.find(artwork => artwork.id === artworkId)
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
    const idx = artwork.findIndex(currartwork => currartwork.id === artwork.id);
    artwork.splice(idx, 1, artwork)
    storageService.store(KEY, artwork)
    return Promise.resolve(artwork)
} 


function removeArtwork(artworkId) {
    const idx = artwork.findIndex(artwork => artwork.id === artworkId)
    if(idx === -1) return Promise.reject('DID NOT REMOVE artwork')
    artwork.splice(idx, 1);
    storageService.store(KEY, artwork)
    return Promise.resolve('artwork REMOVED')
}


function getEmptyArtwork() {
    var emptyartwork =  {
        vendor: '',
        color: '#ff0000',
        speed: 20,
        createdAt : '',
        isAuto : true,
        ownershipType : '',
        seatsCount : 5,
        desc: '',
        features: []
    }
    return emptyartwork;
}

function getNextPrevartworkIds(artworkId) {
    const idx = artwork.findIndex(artwork => artwork.id === artworkId)
    
    var nextIdx = idx + 1;
    if (nextIdx === artwork.length) nextIdx = 0; 
    var prevIdx = idx - 1;
    if (prevIdx < 0) prevIdx = artwork.length-1; 

    return {
        prevId: artwork[prevIdx].id,
        nextId: artwork[nextIdx].id,
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
