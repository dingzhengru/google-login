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
                <h1 class="text-center">登入</h1>
                <v-form
                    class="email-form"
                    v-model="loginValid"
                    lazy-validation
                    @submit.prevent="sendEmail()">
                    <v-text-field
                        name="email"
                        v-model="email"
                        label="信箱"
                        required
                        counter="30"
                        :rules="emailRules"
                        ref="emailRef"
                    ></v-text-field>
                    <v-btn
                        color="primary"
                        type="submit"
                        block
                        :disabled="!email || !loginValid"
                        :loading="isLogining">
                        <v-icon>fa-arrow-circle-right</v-icon>
                    </v-btn>
                </v-form>
            </v-stepper-content>

            <v-stepper-content step="2" class="step2">
                <h1 class="text-center">登入</h1>
                <v-form
                    class="login-form"
                    v-model="loginValid"
                    lazy-validation
                    @submit.prevent="login()"
                    >
                    <v-text-field
                        name="password"
                        v-model="password"
                        label="密碼"
                        required
                        counter="15"
                        ref="passwordRef"
                        :rules="passwordRules"
                    ></v-text-field>
                    <v-btn
                        color="primary"
                        type="submit"
                        block
                        :disabled="!email || !password || !loginValid"
                        :loading="isLogining">
                        <v-icon>fa-arrow-circle-right</v-icon>
                    </v-btn>
                </v-form>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
    <v-row class="login-bottom" no-gutters>
        <v-col cols="6">
            繁體中文
        </v-col>
        <v-col cols="6" class="text-right">
            
        </v-col>
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
            loginValid: false,
            isLogining: false,
            emailRules: [
                v => !!v || '不可為空',
                v => (v && v.length <= 30 && v.length >= 6) || '信箱是 6 到 30個字元',
            ],
            passwordRules: [
                v => !!v || '不可為空',
                v => (v && v.length <= 15 && v.length >=8 ) || '密碼是 8 到 15個字元',
            ],
            st: 1,
        }
    },
    mounted () {
        // focus name input
        this.$nextTick(() => {
            setTimeout(() => {
                this.$refs.emailRef.focus();
            }, 500)
        });
    },
    methods: {
        sendEmail() {
            // 先認證 email
            if(!this.loginValid || !this.email)
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
                    this.error = data
                } else {
                    // 認證成功
                    this.st = 2
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.$refs.passwordRef.focus();
                        }, 500)
                    });
                }
                this.isLogining = false
                console.log(result);
            }).catch(error => {
                this.isLogining = false
                this.hasError = true
                this.error = '意外的錯誤，請重整後再試'
                console.log(error);
            });
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
                    this.error = data
                } else {
                    // 認證成功
                    this.st = 3
                    this.msg = '登入成功'
                    this.hasMsg = true
                }
                this.isLogining = false
                console.log(result);
            }).catch(error => {
                this.isLogining = false
                this.hasError = true
                this.error = '意外的錯誤，請重整後再試'
                console.log(error);
            });
        }
    }
}
</script>

<style lang="scss" scoped>

.container {
    #stepper {
        max-width: 450px;
        margin: 0 auto;
        margin-top: 150px;
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
