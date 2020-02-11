// const express = require('express')
// const firebase = require('firebase')

import express from 'express'
import cors from 'cors'
import firebase from 'firebase'
import registerValids  from './register-valids.js'
import { db }  from './firebase.js'

const app = express()

const corsOptions = {
    origin: [
        'http://localhost:8080',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json()) // for parsing application/json
app.use(express.static('./')) // 靜態檔案
// app.use(cors())

const port = 3000

app.post('/api/auth/login', function (req, res) {
    let email = req.body['email']
    let password = req.body['password']
    
    console.log(email, password)

    let data = []

    // 只有傳email過來
    if(email && !password) {
        console.log('驗證email:', email)
        // 認證信箱
        db.collection('users')
        .where('email', '==', email)
        .get()
        .then(snapshot => {
            data = snapshot.docs.map(doc => doc.data())
            if(data.length <= 0) {
                res.send('無此信箱')
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            console.log('資料庫存取失敗', err)
            res.send('資料庫存取失敗')
        })
    } else if(email && password) {
        // email 跟 password 都有
        // 認證信箱 & 密碼
        console.log('驗證密碼:', email, password)
        db.collection('users')
        .where('email', '==', email)
        .where('password', '==', password)
        .get()
        .then(snapshot => {
            data = snapshot.docs.map(doc => doc.data())
            if(data.length <= 0) {
                res.send('密碼錯誤')
            } else {
                res.json(data)
            }
        })
        .catch(err => {
            console.log('資料庫存取失敗', err)
            res.send('資料庫存取失敗')
        })
    }

    // 認證信箱
    // db.collection('users')
    // .where('email', '==', email)
    // .get()
    // .then(snapshot1 => {
    //     data = snapshot1.docs.map(doc => doc.data())
    //     if(data.length <= 0) {
    //         res.send('無此信箱')
    //     } else {
    //         // 認證密碼
    //         db.collection('users')
    //         .where('password', '==', password)
    //         .get()
    //         .then(snapshot2 => {
    //             data = snapshot2.docs.map(doc => doc.data())
    //             if(data.length <= 0) {
    //                 res.send('有此信箱，但密碼錯誤')
    //             } else {
    //                 res.json(data)
    //             }
    //         })
    //     }
    // })
    // .catch(err => {
    //     console.log('資料庫存取失敗', err)
    //     res.send('資料庫存取失敗')
    // })
})

app.post('/api/auth/register', function (req, res) {
    let firstName = req.body['first-name']
    let lastName = req.body['last-name']
    let email = req.body['email']
    let password = req.body['password']
    
    const data = req.body

    let errors = []

    // 判斷各個值有效性
    registerValids.validEmail(email).then(result => {
        if(result != true){
            errors.push(result)
        }
        if(registerValids.validFirstName(firstName) != true){
            errors.push(registerValids.validFirstName(firstName))
        }
        if(registerValids.validLastName(lastName) != true){
            errors.push(registerValids.validLastName(lastName))
        }
        if(registerValids.validPassword(password) != true){
            errors.push(registerValids.validPassword(password))
        }

        if(errors.length > 0) {
            res.send(errors)
        } else {
            db.collection('users').add(data)
            .then(() => {
                console.log('註冊成功', data)
                res.json(data)
            })
            .catch(err => {
                console.log('註冊失敗', err)
            })
        }
    })
    
})


app.listen(port, () => {
    console.log(`listening on ${ port }`)
})
