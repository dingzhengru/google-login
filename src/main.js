import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader

Vue.config.productionTip = false

// i18n
import VueI18n from 'vue-i18n'

// 自訂語言檔
import en from '../i18n/en/lang'
import tw from '../i18n/tw/lang'

// 取得預設語系
const locale = localStorage.getItem('locale') || 'tw'

Vue.use(VueI18n)

// 建立 VueI18n 實體
const i18n = new VueI18n({
    locale,
    messages: { en, tw }
})

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
