<template>
<v-container class="container">
    <h2>{{ $vuetify.lang.t('$vuetify.home.user') }}</h2>
    <v-simple-table>
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-left">{{ $vuetify.lang.t('$vuetify.home.firstName') }}</th>
                    <th class="text-left">{{ $vuetify.lang.t('$vuetify.home.lastName') }}</th>
                    <th class="text-left">{{ $vuetify.lang.t('$vuetify.home.email') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in getAuth" :key="index">
                    <td>{{ item['first-name'] }}</td>
                    <td>{{ item['last-name'] }}</td>
                    <td>{{ item['email'] }}</td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</v-container>
</template>

<script>

export default {
    name: 'Home',
    data() {
        return {

        }
    },
    computed: {
        getAuth() {
            return this.$store.state.auth
        }
    },
    mounted () {

    },
}
</script>
