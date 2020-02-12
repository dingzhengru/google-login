<template>
<v-container class="container">
    <h1>Home</h1>
    <h2>i18n test</h2>
    <p>
        {{ $vuetify.lang.t('$vuetify.login.title') }}
        {{ $vuetify.lang.t('$vuetify.login.required') }}
    </p>
    <v-select
        :items="getLangs"
        label="語系"
        v-model="lang"
        item-text="text"
        item-value="value"
    ></v-select>
    <p>{{ lang }}</p>
    <p>{{ getCurrentLang }}</p>
    <p>{{ getCurrentLangObject }}</p>
</v-container>
</template>

<script>

export default {
    name: 'Home',
    data() {
        return {
            lang: {text: '繁體中文', value: 'zhHant'}
        }
    },
    computed: {
        getLangs() {
            return this.$store.state.langs
        },
        getCurrentLang() {
            return this.$store.state.currentLang
        },
        getCurrentLangObject() {
            return this.$store.getters.currentLangObject
        }
    },
    mounted () {
        // 從 vue store 那的方法取得 lang object ex: {text: 'English', value: 'en'}
        this.lang = this.getCurrentLangObject
    },
    watch: {
        lang (newValue)  {
            // 取一開始的值會是 object 所以才需要此判斷
            let lang = newValue.value || newValue

            // 利用 localStorage 存取語言
            localStorage.setItem('lang', lang)

            // 修改 vue store 的 currentLang
            this.$store.commit('setCurrentLang', lang)

            // 修改 vuetify 現在的語系
            this.$vuetify.lang.current =  lang

            console.log('watch: set lang:', lang)
        }
    }
}
</script>
