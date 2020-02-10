// const express = require('express')
// const firebase = require('firebase');

import express from 'express'
import firebase from 'firebase'
import registerValids  from './public/js/register-valids.js'

const app = express()

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json()) // for parsing application/json
app.use(express.static('./')) // 靜態檔案
const port = 3000

const firebaseConfig = {
    apiKey: 'AIzaSyAnHjYD0htUcgKgq6qiHnKwqA7wcaZsLSM',
    authDomain: 'login-af40a.firebaseapp.com',
    databaseURL: 'https://login-af40a.firebaseio.com',
    projectId: 'login-af40a',
    storageBucket: 'login-af40a.appspot.com',
    messagingSenderId: '362329142534',
    appId: '1:362329142534:web:cd3dbac8b63d1a0f211a87'
};
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();


console.log(registerValids)

app.post('/api/auth/login', function (req, res) {
    let email = req.body['email'];
    let password = req.body['password'];
    
    console.log(email, password)

    let data = []

    // 認證信箱
    db.collection('users')
    .where('email', '==', email)
    .get()
    .then(snapshot1 => {
        data = snapshot1.docs.map(doc => doc.data())
        if(data.length <= 0) {
            res.send('無此信箱')
        } else {
            // 認證密碼
            db.collection('users')
            .where('password', '==', password)
            .get()
            .then(snapshot2 => {
                data = snapshot2.docs.map(doc => doc.data())
                if(data.length <= 0) {
                    res.send('有此信箱，但密碼錯誤')
                } else {
                    res.json(data)
                }
            })
        }
    })
    .catch(err => {
        console.log('資料庫存取失敗', err);
        res.send('資料庫存取失敗')
    });
});

app.post('/api/auth/register', function (req, res) {
    let firstName = req.body['first-name'];
    let lastName = req.body['last-name'];
    let email = req.body['email'];
    let password = req.body['password'];
    
    console.log(req.body)

    db.collection('users').add(data)

    res.json(req.body);
});


app.listen(port, () => {
    console.log(`listening on ${ port }`)
})
