import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        langs: [
            {
                text: 'English',
                value: 'en'
            },
            {
                text: '繁體中文',
                value: 'zhHant'
            },
            {
                text: 'ไทย',
                value: 'th'
            }
        ],
        currentLang: '',
        auth: null,
    },
    getters: {
        currentLangObject(state) {
            let lang = state.currentLang || localStorage.getItem('lang')
            let langObject = { text: '繁體中文', value: 'zhHant' }
            for(let i in state.langs) {
                if(state.langs[i].value == lang) {
                    langObject = state.langs[i]
                    break
                }
            }
            return langObject
        }
    },
    mutations: {
        setCurrentLang(state, payload) {
            state.currentLang = payload
        },
        setAuth(state, payload) {
            state.auth = payload
        }
    },
    actions: {
    },
    modules: {
    }
})
