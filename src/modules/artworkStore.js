import { artworkService } from '../services/artwork.service.js'


export default {
    state: {
        artwork: {},
        artworks: [],
        currArtwork: null,
        filterBy: null
    },
    getters: {
        artworks(state) {
            return state.artworks;
        },
    },
    mutations: {
        setArtworks(state, { artworks }) {
            state.artworks = artworks;
        },
        setArtwork(state, { artwork }) {
            state.artwork = artwork;
        },
        setCurrArtwork(state, { artwork }) {
            state.currArtwork = artwork;
        },
        removeArtwork(state, { artworkId }) {
            state.artworks = state.artworks.filter(currArtwork => currArtwork._id !== artworkId)
        },
    },
    actions: {
        async loadArtworks(context, { filterBy = null }) {
            console.log(filterBy)
            const artworks = await artworkService.query(filterBy);
            context.commit({ type: 'setArtworks', artworks })
            return artworks;
        },
        async loadArtwork(context, { artworkId }) {
            const artwork = await artworkService.getById(artworkId)
            context.commit({ type: 'setArtwork', artwork })
            return artwork;
        },
        async removeArtwork(context, { artworkId }) {
            await artworkService.removeArtwork(artworkId);
            context.commit({ type: 'removeArtwork', artworkId })
        },
        async updateArtwork(context, { artwork }) {
            let savedArtwork = await artworkService.saveArtwork(artwork);
            context.commit({ type: 'setArtwork', savedArtwork })
            return savedArtwork;
        }
    }
}