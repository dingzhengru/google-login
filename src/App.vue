<template>
<v-app>
    <div id="nav">
        <router-link to="/">首頁</router-link> |
        <router-link to="/login">登入</router-link> |
        <router-link to="/register">註冊</router-link> |
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
