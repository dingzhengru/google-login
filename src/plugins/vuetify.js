import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

import en from '../i18n/en.ts';
import zhHant from '../i18n/zh-Hant.ts';
import th from '../i18n/th.ts';

export default new Vuetify({
    lang: {
        locales: { en, zhHant, th },
        current: 'zh-Hant',
    },
    icons: {
        iconfont: 'fa',
    },
});
