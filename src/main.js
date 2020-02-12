import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader

Vue.config.productionTip = false

// i18n
// Translation provided by Vuetify (javascript)
import zhHant from 'vuetify/es5/locale/zh-Hant'
import en from 'vuetify/es5/locale/en'
import th from 'vuetify/es5/locale/th'

console.log(en)
console.log(zhHant)

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
