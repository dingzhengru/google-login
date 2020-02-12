import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

import zhHant from 'vuetify/es5/locale/zh-Hant'
import en from 'vuetify/es5/locale/en'
import th from 'vuetify/es5/locale/th'



Vue.component('my-component', {
    methods: {
        changeLocale () {
            this.$vuetify.lang.current = 'sv'
        },
    },
})

export default new Vuetify({
    lang: {
        locales: { zhHant, en, th },
        current: 'zhHant',
    },
})