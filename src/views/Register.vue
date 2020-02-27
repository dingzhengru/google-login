<template>
<v-container class="register-container">
    <div v-show="hasError">
        <v-alert 
            type="error"
            v-for="(error, index) in errors"
            :key="index">
            {{ error }}
        </v-alert>
    </div>
    
    <v-alert 
        type="success"
        v-model="hasMsg">
        {{ msg }}
    </v-alert>

    <v-card
        class="register-card mx-auto"
        max-width="450"
    >
        <v-card-title class="justify-center">
            <h2>{{ $vuetify.lang.t('$vuetify.register.title') }}</h2>
        </v-card-title>
        <v-card-text>
            <v-form
                class="register-form"
                v-model="registerValid"
                lazy-validation
                @submit.prevent="register()">
                <v-row>
                    <v-col cols="6">
                        <v-text-field
                            name="firstName"
                            v-model="firstName"
                            :label="$vuetify.lang.t('$vuetify.register.firstName')"
                            counter="10"
                            :rules="firstNameRules"
                            ref="firstNameRef"
                            autofocus
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            name="lastName"
                            v-model="lastName"
                            :label="$vuetify.lang.t('$vuetify.register.lastName')"
                            counter="10"
                            :rules="lastNameRules"
                            ref="lastNameRef"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-text-field
                    name="email"
                    v-model="email"
                    :label="$vuetify.lang.t('$vuetify.register.email')"
                    counter="30"
                    :rules="emailRules"
                    ref="emailRef"
                ></v-text-field>
                <v-text-field
                    :type="isShowPassword ? 'text' : 'password'"
                    :append-icon="isShowPassword ? 'fa-eye' : 'fa-eye-slash'"
                    @click:append="isShowPassword = !isShowPassword"
                    name="password"
                    v-model="password"
                    :label="$vuetify.lang.t('$vuetify.register.password')"
                    counter="15"
                    ref="passwordRef"
                    :rules="passwordRules"
                ></v-text-field>
                <v-text-field

                    :type="isShowPassword ? 'text' : 'password'"
                    :append-icon="isShowRepassword ? 'fa-eye' : 'fa-eye-slash'"
                    @click:append="isShowRepassword = !isShowRepassword"
                    name="repassword"
                    v-model="repassword"
                    :label="$vuetify.lang.t('$vuetify.register.repassword')"
                    counter="15"
                    ref="repasswordRef"
                    :rules="repasswordRules"
                ></v-text-field>
                <v-btn
                    color="primary"
                    type="submit"
                    block
                    :disabled="!firstName || !lastName || !email || !password || !repassword  || !registerValid"
                    :loading="isRegistering">
                    <v-icon>fa-paper-plane</v-icon>
                </v-btn>
                <!-- <v-btn
                    color="primary"
                    type="submit"
                    block
                    :loading="isRegistering">
                    <v-icon>fa-paper-plane</v-icon>
                </v-btn> -->
            </v-form>
        </v-card-text>
        <v-card-actions>
      
        </v-card-actions>
    </v-card>
    <v-row class="register-bottom" no-gutters>
        <v-col cols="4">
            <v-select
                :items="getLangs"
                label="語系"
                v-model="lang"
                item-text="text"
                item-value="value"
            ></v-select>
        </v-col>
        <v-col cols="8" class="text-right"></v-col>
    </v-row>
</v-container>
</template>

<script>
import axios from 'axios'


export default {
    name: 'Register',
    data () {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repassword: '',
            msg: '',
            errors: [],
            hasMsg: false,
            hasError: false,
            registerValid: false,
            isRegistering: false,
            isShowPassword: false,
            isShowRepassword: false,
            lang: {text: '繁體中文', value: 'zhHant'}
        }
    },
    computed: {
        firstNameRules() {
            return [
                v => !!v || this.$vuetify.lang.t('$vuetify.register.required'),
                v => (v && v.length <= 10) || this.$vuetify.lang.t('$vuetify.register.firstNameLen'),
            ]
        },
        lastNameRules() {
            return [
                v => !!v || this.$vuetify.lang.t('$vuetify.register.required'),
                v => (v && v.length <= 10) || this.$vuetify.lang.t('$vuetify.register.lastNameLen'),
            ]
        },
        emailRules() {
            return [
                v => !!v || this.$vuetify.lang.t('$vuetify.register.required'),
                v => (v && v.length <= 30 && v.length >= 6) || this.$vuetify.lang.t('$vuetify.register.emailLen'),
            ]
        },
        passwordRules() {
            return [
                v => !!v || this.$vuetify.lang.t('$vuetify.register.required'),
                v => (v && v.length <= 15 && v.length >=8 ) || this.$vuetify.lang.t('$vuetify.register.passwordLen'),
            ]
        },
        repasswordRules() {
            return [
                v => !!v || this.$vuetify.lang.t('$vuetify.register.required'),
            ]
        },
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

        // focus name input
        // this.$nextTick(() => {
        //     setTimeout(() => {
        //         this.$refs.firstNameRef.focus();
        //     }, 500)
        // });
    },
    methods: {
        register() {
            const firstName = this.firstName
            const lastName = this.lastName
            const email = this.email
            const password = this.password
            const repassword = this.repassword

            this.isRegistering = true
            this.errors = []
            this.hasMsg = false
            this.hasError = false

            if(password != repassword) {
                this.errors.push(this.$vuetify.lang.t('$vuetify.register.repasswordNotMatch'))
                this.hasError = true
                this.isRegistering = false
                return
            }

            axios.post('http://localhost:3000/api/auth/register', {
                'first-name': firstName,
                'last-name': lastName,
                email: email,
                password: password
            }).then(result => {
                let data = result.data
                // 回傳回來的是 Array (errors)
                if (typeof data === 'string' || data instanceof String || Array.isArray(data)) {
                    this.hasError = true
                    for(let i in data) {
                        if(data[i] == 'emailSpecial') {
                            this.errors.push(this.$vuetify.lang.t('$vuetify.register.emailSpecial'))
                        }
                        if(data[i] == 'emailExisted') {
                            this.errors.push(this.$vuetify.lang.t('$vuetify.register.emailExisted'))
                        }
                        if(data[i] == 'passwordSpecial') {
                            this.errors.push(this.$vuetify.lang.t('$vuetify.register.passwordSpecial'))
                        }
                        if(data[i] == 'passwordValid') {
                            this.errors.push(this.$vuetify.lang.t('$vuetify.register.passwordValid'))
                        }
                    }
                } else {
                    // 認證成功
                    this.msg = '註冊成功'
                    this.hasMsg = true
                }
                this.isRegistering = false
            }).catch(error => {
                this.isRegistering = false
                this.hasError = true
                this.errors.push(this.$vuetify.lang.t('$vuetify.register.otherError'))
            });
        },
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

            // console.log('watch: set lang:', lang)
        }
    }
}
</script>

<style lang="scss">

// 不用 scope 才可對 v-input__icon 改變 style


.register-container {
    .register-card {
        margin-top: 100px;
    }
    .register-bottom {
        margin: 0 auto;
        margin-top: 20px;
        margin-bottom: 100px;
        width: 450px;
    }

    .v-input__icon--append .fa-eye { 
        font-size: 1rem;
    }
    .v-input__icon--append .fa-eye-slash  { 
        font-size: 1rem;
    }
}


</style>
