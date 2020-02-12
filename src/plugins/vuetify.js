import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import zhHant from 'vuetify/es5/locale/zh-Hant';

Vue.use(Vuetify);

import en from '../i18n/en.ts';

export default new Vuetify({
    lang: {
        locales: { en, zhHant },
        current: 'zh-Hant',
    },
    icons: {
        iconfont: 'fa',
    },
});
