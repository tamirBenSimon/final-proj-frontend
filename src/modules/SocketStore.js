import socket from '../services/httpService-for_backend/SocketService.js'

export default {
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {
        sendMsg(context, { msg }) {
            socket.emit('sendMsg', msg)
        },
        getChatHistory(context, { chatId }) {
            socket.emit('getHistory', chatId)
        }
    }
}