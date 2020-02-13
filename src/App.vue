<template>
<v-app>
    <div id="nav">
        <v-btn to="/">首頁</v-btn> |
        <v-btn to="/login">登入</v-btn> |
        <v-btn to="/register">註冊</v-btn> |
        <v-btn @click="logout()">登出</v-btn>
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
    

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
