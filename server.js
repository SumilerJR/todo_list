// (第一步)加载第三方插件：express
const express = require('express');
const app = express();
//暴露静态资源
app.use(express.static(__dirname + '/dist'))
app.listen(3000, () => {
    console.log('http://127.0.0.1:3000/');
})