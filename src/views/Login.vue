<template>
<v-container class="container">
    <v-alert 
        type="error"
        v-model="hasError">
        {{ error }}
    </v-alert>
    <v-alert 
        type="success"
        v-model="hasMsg">
        {{ msg }}
    </v-alert>
    <v-stepper v-model="st" id="stepper">
        <v-stepper-items>
            <v-stepper-content step="1" class="step1">
                <h1 class="text-center">{{ $vuetify.lang.t('$vuetify.login.title') }}</h1>
                <v-form
                    class="email-form"
                    v-model="emailValid"
                    lazy-validation
                    @submit.prevent="sendEmail()">
                    <v-text-field
                        name="email"
                        v-model="email"
                        :label="$vuetify.lang.t('$vuetify.login.email')"
                        counter="30"
                        :rules="emailRules"
                        ref="emailRef"
                        autofocus
                    ></v-text-field>
                    
                    <v-btn
                        color="primary"
                        type="submit"
                        block
                        :disabled="!email || !emailValid"
                        :loading="isLogining">
                        <v-icon>fa-arrow-circle-right</v-icon>
                    </v-btn>
                </v-form>
            </v-stepper-content>

            <v-stepper-content step="2" class="step2">
                <h1 class="text-center">{{ $vuetify.lang.t('$vuetify.login.title') }}</h1>
                <v-form
                    class="login-form"
                    v-model="loginValid"
                    lazy-validation
                    @submit.prevent="login()"
                    >
                    <v-text-field
                        name="password"
                        v-model="password"
                        :label="$vuetify.lang.t('$vuetify.login.password')"
                        counter="15"
                        ref="passwordRef"
                        :rules="passwordRules"
                    ></v-text-field>
                    <v-row>
                        <v-col cols="2">
                            <v-btn
                                color="secondary"
                                block
                                @click="st = 1">
                                <v-icon>fa-arrow-circle-left</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="2"></v-col>
                        <v-col cols="8">
                            <v-btn
                                color="primary"
                                type="submit"
                                block
                                :disabled="!email || !password || !loginValid"
                                :loading="isLogining">
                                <v-icon>fa-paper-plane</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <!-- <v-btn
                        color="primary"
                        type="submit"
                        block
                        :disabled="!email || !password || !loginValid"
                        :loading="isLogining">
                        <v-icon>fa-paper-plane</v-icon>
                    </v-btn> -->
                </v-form>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
    <v-row class="login-bottom" no-gutters>
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
    name: 'Login',
    data () {
        return {
            email: '',
            password: '',
            msg: '',
            error: '',
            hasMsg: false,
            hasError: false,
            emailValid: false,
            loginValid: false,
            isLogining: false,
            st: 1,
            lang: {text: '繁體中文', value: 'zhHant'}
        }
    },
    computed: {
        emailRules() {
            return [
                v => !!v || this.$vuetify.lang.t('$vuetify.login.required'),
                v => (v && v.length <= 30 && v.length >= 6) || this.$vuetify.lang.t('$vuetify.login.emailLen'),
            ]
        },
        passwordRules() {
            return [
                v => !!v || this.$vuetify.lang.t('$vuetify.login.required'),
                v => (v && v.length <= 15 && v.length >=8 ) || this.$vuetify.lang.t('$vuetify.login.passwordLen'),
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
        //         this.$refs.emailRef.focus()
        //     }, 500)
        // });
    },
    methods: {
        sendEmail() {
            // 先認證 email
            if(!this.emailValid || !this.email)
                return
            const email = this.email

            this.isLogining = true
            this.error = ''
            this.hasMsg = false
            this.hasError = false

            axios.post('http://localhost:3000/api/auth/login', {
                email: email,
            }).then(result => {
                let data = result.data
                if (typeof data === 'string' || data instanceof String) {
                    this.hasError = true
                    // 判斷是甚麼錯誤，對應翻譯內容
                    if(data == 'emailNotExist') {
                        this.error = this.$vuetify.lang.t('$vuetify.login.emailNotExist')
                    } else {
                        this.error = this.$vuetify.lang.t('$vuetify.login.otherError')
                    }
                } else {
                    // 認證成功
                    this.st = 2
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.$refs.passwordRef.focus()
                        }, 500)
                    })
                }
                this.isLogining = false
            }).catch(error => {
                // 意外的錯誤
                this.isLogining = false
                this.hasError = true
                this.error = this.$vuetify.lang.t('$vuetify.login.otherError')
            })
        },
        login () {
            // 驗證必須通過、email 與 password 不可為空
            if(!this.loginValid || !this.email || !this.password)
                return
            const email = this.email
            const password = this.password

            this.isLogining = true
            this.error = ''
            this.hasMsg = false
            this.hasError = false

            axios.post('http://localhost:3000/api/auth/login', {
                email: email,
                password: password
            }).then(result => {
                let data = result.data
                if (typeof data === 'string' || data instanceof String) {
                    this.hasError = true
                    if(data == 'passwordWrong') {
                        this.error = this.$vuetify.lang.t('$vuetify.login.passwordWrong')
                    } else {
                        this.error = this.$vuetify.lang.t('$vuetify.login.otherError')
                    }
                } else {
                    // 登入成功
                    this.st = 3
                    this.msg = this.$vuetify.lang.t('$vuetify.login.success')
                    this.hasMsg = true

                    // 登入資料放入 localStorage (只能存字串，所以先轉成字串，拿出來時再轉回來就好)
                    localStorage.setItem('auth', JSON.stringify(data))

                    // 登入資料放入 vue store
                    this.$store.commit('setAuth', data)

                    setTimeout(() => {
                        this.$router.push('/')
                    }, 500)
                }
                this.isLogining = false
            }).catch(error => {
                // 意外的錯誤
                this.isLogining = false
                this.hasError = true
                this.msg = this.$vuetify.lang.t('$vuetify.login.otherError')
            })
        }
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

<style lang="scss" scoped>

.container {
    #stepper {
        max-width: 450px;
        margin: 0 auto;
        margin-top: 100px;
        .step1 {

        }
        .step2 {
            
        }

    }
    .login-bottom {
        margin: 0 auto;
        margin-top: 20px;
        margin-bottom: 100px;
        width: 450px;
    }
}



</style>
