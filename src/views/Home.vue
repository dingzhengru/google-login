<template>
<v-container class="container">
    <h1>Home</h1>
    <h2>vue i18n test</h2>
    <p>
        {{ $vuetify.lang.t('$vuetify.login') }}
    </p>
</v-container>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'Home',
    mounted () {
        this.$vuetify.lang.current = 'zhHant'

        console.log(this.$vuetify.lang.t('$vuetify.dataIterator.noResultsText'))
    }
}
</script>
