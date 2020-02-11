<template>
<v-container class="container">
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
            <h2>註冊</h2>
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
                            label="姓氏"
                            required
                            counter="10"
                            :rules="firstNameRules"
                            ref="firstNameRef"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            name="lastName"
                            v-model="lastName"
                            label="名字"
                            required
                            counter="10"
                            :rules="lastNameRules"
                            ref="lastNameRef"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-text-field
                    name="email"
                    v-model="email"
                    label="信箱"
                    required
                    counter="30"
                    :rules="emailRules"
                    ref="emailRef"
                ></v-text-field>
                <v-text-field
                    name="password"
                    v-model="password"
                    label="密碼"
                    required
                    counter="15"
                    ref="passwordRef"
                    :rules="passwordRules"
                ></v-text-field>
                <v-text-field
                    name="repassword"
                    v-model="repassword"
                    label="密碼確認"
                    required
                    counter="15"
                    ref="repasswordRef"
                    :rules="repasswordRules"
                ></v-text-field>
                <!-- <v-btn
                    color="primary"
                    type="submit"
                    block
                    :disabled="!firstName || !lastName || !email || !password || !repassword  || !registerValid"
                    :loading="isRegistering">
                    <v-icon>fa-paper-plane</v-icon>
                </v-btn> -->
                <v-btn
                    color="primary"
                    type="submit"
                    block
                    :loading="isRegistering">
                    <v-icon>fa-paper-plane</v-icon>
                </v-btn>
            </v-form>
        </v-card-text>
        <v-card-actions>
      
        </v-card-actions>
    </v-card>
    <v-row class="register-bottom" no-gutters>
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
            firstNameRules: [
                v => !!v || '不可為空',
                v => (v && v.length <= 10) || '最多10字元'
            ],
            lastNameRules: [
                v => !!v || '不可為空',
                v => (v && v.length <= 10) || '最多10字元',
            ],
            emailRules: [
                v => !!v || '不可為空',
                v => (v && v.length <= 30 && v.length >= 6) || '信箱是 6 到 30個字元',
            ],
            passwordRules: [
                v => !!v || '不可為空',
                v => (v && v.length <= 15 && v.length >=8 ) || '密碼是 8 到 15個字元',
            ],
            repasswordRules: [
                v => !!v || '不可為空',
            ],
            st: 1,
        }
    },
    mounted () {
        // focus name input
        this.$nextTick(() => {
            setTimeout(() => {
                this.$refs.firstNameRef.focus();
            }, 500)
        });
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
                this.errors.push('密碼確認與密碼不符')
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
                    this.errors = data
                } else {
                    // 認證成功
                    this.msg = '註冊成功'
                    this.hasMsg = true
                }
                this.isRegistering = false
                console.log(result);
            }).catch(error => {
                this.isRegistering = false
                this.hasError = true
                this.errors.push('意外的錯誤，請重整後再試')
                console.log(error);
            });
        },
    }
}
</script>

<style lang="scss" scoped>

.container {
    .register-card {
        margin-top: 100px;
    }
    .register-bottom {
        margin: 0 auto;
        margin-top: 20px;
        margin-bottom: 100px;
        width: 450px;
    }
}



</style>
