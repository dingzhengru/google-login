<template>
<v-container>
    <!-- <div class="alert-div mt-2">
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
    </div> -->
    <form @submit.prevent="">
        <h1 class="text-center mb-4">{{ $vuetify.lang.t('$vuetify.login.title') }}</h1>
        <div class="input-box"
            :class="{ 'input-box-fade-in': st == 1,
                      'input-box-fade-out': st != 1 }">
            <input 
            :class="{'error-input': hasError}"
            type="text" 
            name="email" 
            ref="email"
            v-model="email" 
            :disabled="st != 1"
            required
            autocomplete="off" />
            <label :class="{ 'label-active': !!email}">
                {{ $vuetify.lang.t('$vuetify.login.email') }}
            </label>
            <div class="error-msg" v-show="hasError || error">
                <span class="fas fa-exclamation-circle fa-sm mr-1"></span>
                <span>{{ error }}</span>
            </div>
            <v-btn
                color="primary"
                type="submit"
                block
                @click="sendEmail()"
                :loading="isLogining"
                :disabled="st != 1"
                v-if="st == 1">
                <v-icon>fa-arrow-circle-right</v-icon>
            </v-btn>
        </div>
        <div class="input-box"
             :class="{ 'input-box-password-fade-in': st == 2,
                       'input-box-password-fade-out': st != 2 }">
            <div class="input-box">
                <input 
                :class="{'error-input': hasError}"
                :type="passwordType" 
                name="text" 
                ref="password"
                v-model="password" 
                :disabled="st != 2"
                required
                autocomplete="off"/>

                <label :class="[!!password ? 'label-active' : '']">
                    {{ $vuetify.lang.t('$vuetify.login.password') }}
                </label>
                <div class="error-msg" v-show="hasError || error">
                    <span class="fas fa-exclamation-circle fa-sm mr-1"></span>
                    <span>{{ error }}</span>
                </div>
                <span class="fa fa-fw eye-icon"
                      :class="{ 'fa-eye': passwordType == 'text',
                                'fa-eye-slash': passwordType == 'password' }"
                      @click="togglePassword()"></span>
            </div>
            <v-row no-gutters>
                <v-col cols="3">
                    <v-btn
                        color="secondary"
                        type="button"
                        block
                        @click="backStep()">
                        <v-icon>fa-arrow-circle-left</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="3">
                </v-col>
                <v-col cols="6">
                    <v-btn
                        color="primary"
                        type="submit"
                        block
                        @click="login()"
                        :loading="isLogining"
                        :disabled="st != 2">
                        登入
                    </v-btn>
                </v-col>
            </v-row>   
        </div>
    </form>
    <v-row class="login-bottom mt-3" no-gutters>
        <v-col cols="3"></v-col>
        <v-col cols="2">
            <v-select
                :items="getLangs"
                label="語系"
                v-model="lang"
                item-text="text"
                item-value="value"
            ></v-select>
        </v-col>
        <v-col cols="7"></v-col>
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
            passwordType: 'password',
            msg: '',
            error: '',
            hasMsg: false,
            hasError: false,
            loginValid: false,
            isLogining: false,
            st: 1,
            lang: {text: '繁體中文', value: 'zhHant'}
        }
    },
    computed: {
        emailValid () {
            if(this.email) {
                return true
            }
            return false
        },
        passwordValid() {
            if(this.password) {
                return true
            }
            return false
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
        this.$nextTick(() => {
            setTimeout(() => {
                this.$refs.email.focus();
            }, 100)
        });
    },
    methods: {
        sendEmail() {
            // 先認證 email
            if(!this.emailValid) {
                return
            }
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
                            this.$refs.password.focus()
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
            if(!this.emailValid || !this.passwordValid)
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
                    // this.st = 3
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
        },
        backStep() {
            this.st = 1
            this.$nextTick(() => {
                setTimeout(() => {
                    this.$refs.email.focus()
                }, 500)
            })
        },
        togglePassword() {
            if(this.passwordType == 'password') 
                this.passwordType = 'text'
            else
                this.passwordType = 'password'
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

    form, form * { margin:0 auto; }

    form {
        height: 500px;
        width: 450px;
        border-radius: 8px;
        box-shadow: 0 2px 10px -3px #333;
        padding: 40px;
        padding-top: 60px;
        margin-top: 50px;
        overflow: hidden; // 關鍵屬性，不然動畫會是跑到外面
    }

    .input-box {
        position: relative;
        

        // margin-top: 10px;

        top: 0;
        left: 0;

        input {
            width: 100%;
            padding: 0.625rem 10px;
            font-size: 1rem;
            letter-spacing: 0.062rem;
            // margin-bottom: 1.875rem;
            border: 1px solid #ccc;
            background: transparent;
            border-radius: 4px;
        }

        input:focus {
            outline: none;
            border: 2px solid #1a73e8;
        }

        label {
            position: absolute;
            top: 0;
            left: 10px;
            padding: 0.625rem 0;
            font-size: 1rem;
            color: grey;
            pointer-events: none;
            transition: 0.3s;
        }

        .error-msg {
            font-size: 0.75rem;
            color: red;
        }

        // error
        .error-input {
            border: 1px solid red;
        }
        .error-input:focus {
            outline: none !important;
            border: 2px solid red !important;
        }
        .error-input ~ label {
           color: red !important;
        }

        // 跟下面的 focus 一樣
        label.label-active {
            top: -1.2rem;
            left: 10px;
            color: #1a73e8;
            font-size: 0.75rem;
            background-color: white;
            height: 10px;
            padding-left: 5px;
            padding-right: 5px;
            padding-bottom: 18px;
        }

        input:focus ~ label{
            top: -1.2rem;
            left: 10px;
            color: #1a73e8;
            font-size: 0.75rem;
            background-color: white;
            height: 10px;
            padding-left: 5px;
            padding-right: 5px;
            padding-bottom: 18px;
        }
        .eye-icon {
            position: absolute;
            top: 15px;
            right: 5px;
            z-index: 2;
            cursor: pointer;
        }

        button {
            margin-top: 15px;
        }
    }

    // Transition

    .input-box-fade-in {
        left: 0;
        height: 100px;
        opacity: 1;
        transition: all 0.2s linear;
        transition-delay: 0.2s;
    }

    .input-box-fade-out {
        left: -100%;
        height: 0;
        opacity: 0;
        transition: all 0.2s linear;
    }

    .input-box-password-fade-in {
        left: 0;
        height: 100px;
        opacity: 1;
        transition: all 0.2s linear;
        transition-delay: 0.2s;
    }

    .input-box-password-fade-out {
        left: 100%;
        height: 0;
        opacity: 0;
        transition: all 0.2s linear;
    }
    .login-bottom {
        margin-bottom: 100px;
    }
}
</style>
