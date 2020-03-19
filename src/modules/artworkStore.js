import artworkService from '../services/artwork.service.js'

// var localLoggedinUser = null;
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);
// loggedinUser : localLoggedinUser,

export default {
    state: {
        artworks: []
    },
    getters: {
        artworks(state) {
            return state.artworks;
        },

    },
    mutations: {
        // setUser(state, {user}) {
        //     state.loggedinUser = user;
        // },
        setArtworks(state, {artworks}) {
            state.artworks = artworks;
        },
        removeArtwork(state, {artworkId}) {
            state.artworks = state.artworks.filter(currArtwork => currArtwork._id !== artworkId)
        },
    },
    actions: {
            async loadArtworks(context) {
            const artworks = await artworkService.query();
            context.commit({type: 'setArtworks', artworks})
            return Promise.resolve( artworks);
        },
        async removeArtwork(context, {artworkId}) {
            await artworkService.remove(artworkId);
            context.commit({type: 'removeArtwork', artworkId})
        },
        async updateArtwork(context, {artwork}) {
            artwork = await artworkService.update(artwork);
            context.commit({type: 'setUser', artwork})
            return artwork;
        }
    }
}





//action:
        // async login(context, {userCred}) {
        //     const user = await artworkService.login(userCred);
        //     context.commit({type: 'setUser', user})
        //     return user;
        // },
        // async signup(context, {userCred}) {
        //     const user = await artworkService.signup(userCred)
        //     context.commit({type: 'setUser', user})
        //     return user;  
        // },
        // async logout(context) {
        //     await artworkService.logout()
        //     context.commit({type: 'setUsers', users: []})
        //     context.commit({type: 'setUser', user: null})
        // },

// getter:
        // loggedinUser(state) {
        //     return state.loggedinUser
        // }

