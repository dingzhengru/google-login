import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader

Vue.config.productionTip = false



new Vue({
    router,
    store,
    vuetify,
    beforeCreate() {
        // 利用 localStorage 取得語言
        // 設置語言 vuetify & vue store
        let lang = localStorage.getItem('lang') || 'zhHant'
        this.$vuetify.lang.current = lang
        this.$store.commit('setCurrentLang', lang)

        // 設置登入資料(已登入的話)，localStorage 只能存字串，所以裡面的是 json string 要先轉換
        let auth = JSON.parse(localStorage.getItem('auth')) || null

        // 設置登入資料 vue store
        this.$store.commit('setAuth', auth)
    },
    render: h => h(App)
}).$mount('#app')
