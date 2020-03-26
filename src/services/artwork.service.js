
import httpService from './HttpService.js'

function query(filterBy = null) {
    var queryParams = new URLSearchParams()
    for (let key in filterBy) {
        if (filterBy[key]) queryParams.set(`${key}`, filterBy[key])
    }
    const artworks = httpService.get(`artwork/?${queryParams}`);
    return Promise.resolve(artworks)
}


async function getById(artworkId) {
        return httpService.get(`artwork/${artworkId}`)
}


function saveArtwork(artwork) {
    if (artwork._id) return _updateArtwork(artwork)
    else return _addArtwork(artwork);
}

function _addArtwork(artwork) {
    return httpService.add(`artwork/${artwork}`)

}

function _updateArtwork(artwork) {
    return httpService.put(`artwork/${artwork._id}`, artwork)

}


function removeArtwork(artworkId) {
    return httpService.delete(`artwork/${artworkId}`)
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

// function getNextPrevartworkIds(artworkId) {
//     const idx = gArtworks.findIndex(artwork => artwork.id === artworkId)

//     var nextIdx = idx + 1;
//     if (nextIdx === gArtworks.length) nextIdx = 0;
//     var prevIdx = idx - 1;
//     if (prevIdx < 0) prevIdx = gArtworks.length - 1;

//     return {
//         prevId: gArtworks[prevIdx].id,
//         nextId: gArtworks[nextIdx].id,
//     }
// }

// CRUDL - Create, Read, Update, Delete, List
export const artworkService = {
    query,
    getById,
    saveArtwork,
    removeArtwork,
    getEmptyArtwork,
}