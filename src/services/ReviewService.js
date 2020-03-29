// import HttpService from './httpService- for backend/HttpService'

// export default {
//     add,
//     query,
//     remove
// }

// function query() {

//     // The filterBy will come from a parameter (Refactor this).
//     const filterBy = {
//         txt: 'a',
//         min: 8
//     }

//     // We create an instance of URLSearchParams
//     var queryParams = new URLSearchParams()

//     // Setting parameters in our queryParams (if they exist):
//     if (filterBy.txt) {
//         queryParams.set('txt', filterBy.txt)
//         queryParams.set('min', filterBy.min)
//     }

//     // Stringifying the queryParams to the "review?" (query params will always come after "?");
//     return HttpService.get(`review?${queryParams}`)
// }

// function remove(reviewId) {
//     return HttpService.delete(`review/${reviewId}`)
// }

// function add(review) {
//     return HttpService.post(`review`, review)
// }