import loadMore from '../assets/js/loadMore.js'
export default {
    state: {
        messages: [],
        messagesMain: []
    },
    mutations: {
        setMessage(state, payload) {
            state.messages = payload
        },
        setMessageMain(state, payload) {
            state.messagesMain = payload
        }, 
        loadMessages(state, payload){
            state.messagesMain =[...state.messagesMain, ...payload] //обьединили массив messagesMain и переданный результат из импортируемой ф-ии loadMore
        }
    },
    actions: {
        setMessage({ commit }, payload) {
            commit('setMessage', payload)
        },
        setMessageMain({ commit }, payload) {
            commit('setMessageMain', payload)
        },
        loadMessages({ commit, getters }){
          let res = getters.getMessageFilter
          commit('loadMessages', loadMore(res))
        }
    },
    getters: {
        getMessage(state) {
            return state.messages
        },
        getMessageMain(state) {
            return state.messagesMain
        },
        getMessageFilter(state) { // это геттерс, который фильтрует сообщения, где mes.main === false
            return state.messages.filter(mes => {
                 return mes.main === false
            })
        },
    }
}