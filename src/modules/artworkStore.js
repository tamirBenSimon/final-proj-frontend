import { artworkService } from '../services/artwork.service.js'


export default {
    state: {
        artwork:{},
        artworks: [],
        currArtwork: null,
        filterBy:null
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
        async loadArtworks(context, {filterBy=null}) {
            const artworks = await artworkService.query(filterBy);
            context.commit({ type: 'setArtworks', artworks })
            return Promise.resolve(artworks);
        },
        async loadArtwork(context, { artworkId }) {
            const artwork = await artworkService.getById(artworkId)
            context.commit({ type: 'setArtwork', artwork })
            return Promise.resolve(artwork);
        },
        async removeArtwork(context, { artworkId }) {
            await artworkService.removeArtwork(artworkId);
            context.commit({ type: 'removeArtwork', artworkId })
        },
        async updateArtwork(context, { artwork }) {
            artwork = await artworkService.update(artwork);
            context.commit({ type: 'artwork', artwork })
            return artwork;
        }
    }
}