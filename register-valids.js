import { db } from '../../firebase.js'

// validEmail: async function (return promise)

export default {
    validFirstName(value) {
        // 不可為空值
        if(!value) {
            console.log('姓氏不可為空')
            return '姓氏不可為空'
        }

        // 長度需小於 10
        if(value.length >= 10) {
            console.log('姓氏長度需小於 10')
            return '姓氏長度需小於 10'
        }
        return true
    },
    validLastName(value) {
        // 不可為空值
        if(!value) {
            console.log('名字不可為空')
            return '名字不可為空'
        }

        // 長度需小於 10
        if(value.length >= 10) {
            console.log('名字長度需小於 10')
            return '名字長度需小於 10'
        }
        return true
    },
    async validEmail(value) {
        let data = []
        let firstCharRegex = new RegExp('^[0-9]'); // 開頭不能是數字
        let specialCharRegex = new RegExp('[^A-Za-z0-9]'); // 不能有特殊字 (只要有特殊字 就會true)

        // 不可為空值
        if(!value) {
            console.log('信箱不可為空')
            return '信箱不可為空'
        }

        // 長度需為 6~30
        if(value.length < 6 || value.length > 30) {
            console.log('信箱長度必須是 6 到 30 個字元')
            return '信箱長度必須是 6 到 30 個字元'
        }

        // 開頭不能是數字 (開頭是數字就回傳 true)
        if(firstCharRegex.test(value)) {
            console.log('信箱開頭不能是數字')
            return '信箱開頭不能是數字'
        }

        // 不可有特殊字(有特殊字 會回傳 true)
        if(specialCharRegex.test(value)) {
            console.log('信箱不可有特殊字')
            return '信箱不可有特殊字'
        }

        // 不可重複
        let usersRef = db.collection('users').where('email', '==', value);
        try {
            let userSnapShot = await usersRef.get();
            data = userSnapShot.docs.map(doc => doc.data())
            if(data.length > 0) {
                console.log('此信箱已註冊')
                return '此信箱已註冊'
            }
        }
        catch (err) {
            console.log('認證信箱錯誤', err);
        }

        return true
    },
    validPassword(value) {
        // 參考: https://stackoverflow.com/questions/14850553/javascript-regex-for-password-containing-at-least-8-characters-1-number-1-uppe
        // 8~15字元、最少要有一個小寫英文與數字
        let passwordRegex = new RegExp("^(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z]{8,15}$")
        let specialCharRegex = new RegExp('[^A-Za-z0-9]'); // 不能有特殊字 (只要有特殊字 就會true)
        let lengthRegex = new RegExp("[0-9a-zA-Z]{8,15}") // 符合長度會回傳 true

        // 不可為空值
        if(!value) {
            console.log('密碼不可為空')
            return '密碼不可為空'
        }

        if(specialCharRegex.test(value)) {
            console.log('密碼不可有特殊字')
            return '密碼不可有特殊字'
        }

        if(!lengthRegex.test(value)) {
            console.log('密碼長度必須是 8 到 15個字元')
            return '密碼長度必須是 8 到 15個字元'
        }

        if(!passwordRegex.test(value)) {
            console.log('密碼必須是長度為 8 到 15 的英數混合字串')
            return '密碼必須是長度為 8 到 15 的英數混合字串'
        }
        return true
    }
}