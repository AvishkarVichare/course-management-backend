const express = require('express');
const app = express();
const connectToDB = require('./config/db');

connectToDB()

app.get('/get',(req,res)=>{
    res.send('hiis')
})

module.exports = app;   