# 前端任務 - Google 登入

## 執行 vue-cli
*  ```npm run serve```

## 執行 server
*  有用到 import/export，使用 esm 來實現
*  下載 ```npm install --save esm```
*  執行 ```node -r esm server.js```
*  或是在 package.json 中改成 ```"server": "node  -r esm server.js"``` 然後 ```npm server```

## cors
*  允許跨站存取，以下是此次設定
```
import cors from 'cors'
const corsOptions = {
    origin: [
        'http://localhost:8080',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
}
app.use(cors(corsOptions))
```

## Regex
*  密碼的 ```^(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z]{8,15}$```，參考: https://stackoverflow.com/questions/14850553/javascript-regex-for-password-containing-at-least-8-characters-1-number-1-uppe
*  密碼條件是，至少要有一個小寫英文，至少要有一個數字，長度必須是 8 ~ 15


```
// 密碼的 regex 說明
(?=.*[0-9])         // 必須包含一個數字
(?=.*[a-z])         // 必須包含一個小寫英文
(?=.*[A-Z])         // 必須包含一個大寫英文
[a-zA-Z0-9]{8,15}   // 數字、大小寫英文的加總必須是 8~15
```


## Vuetify

### fontawesome 5 設置
*  參考: https://vuetifyjs.com/en/customization/icons
*  先確認 index.html 裡，有沒有引入 ```<link href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" rel="stylesheet">```
*  npm install @fortawesome/fontawesome-free -D
*  在 main.js 引入 ```import '@fortawesome/fontawesome-free/css/all.css'```

使用範例
```
<v-icon>fa-search</v-icon>
```