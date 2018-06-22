
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('./socket').listen(http);

app.use(bodyParser.urlencoded({
    extended:true
}));

app.get('/', (req,res) => {
    res.send('TrisServer');
});

http.listen(3000, () => {
    console.log('Server avviato sulla porta 3000');
});