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
    beforecreate() {
        // 利用 localStorage 取得語言
        // 設置語言 vuetify & vue store
        let lang = localStorage.getItem('lang') || 'zhHant'
        this.$vuetify.lang.current = lang
        this.$store.commit('setCurrentLang', lang)
    },
    render: h => h(App)
}).$mount('#app')
