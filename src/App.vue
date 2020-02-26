<template>
<v-app>
    <div id="nav">
        <v-btn to="/">{{ $vuetify.lang.t('$vuetify.app.nav.home') }}</v-btn>
        <v-btn to="/login-no-vuetify">登入(NoVuetify)</v-btn>
        <v-btn to="/login">{{ $vuetify.lang.t('$vuetify.app.nav.login') }}</v-btn>
        <v-btn to="/register">{{ $vuetify.lang.t('$vuetify.app.nav.register') }}</v-btn>
        <v-btn @click="logout()">{{ $vuetify.lang.t('$vuetify.app.nav.logout') }}</v-btn>
    </div>
    <router-view/>
</v-app>
</template>

<script>
export default {
    name: 'App',
    data () {
        return {

        }
    },
    mounted() {
        
    },
    methods: {
        logout() {
            localStorage.removeItem('auth')
            this.$store.commit('setAuth', null)
        }
    }
}
</script>

<style lang="scss" scoped>
#app {
    font-family: "Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif;
}

#nav {
    text-align: center;
    padding: 10px;
    
    a , button{
        font-weight: bold;
        
        margin-right: 5px;

        &.router-link-exact-active {
            color: #42b983;
        }

        &.v-btn--active {
            color: darkblue;
        }

        &:hover {
            color: white;
            background-color: gray;
        }
    }
}
</style>
