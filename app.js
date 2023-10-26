const express = require('express');
const app = express();
const cors = require('cors');
const connectToDB = require('./config/db');
const adminRouter = require('./routes/admin');
const courseRouter = require('./routes/course');
const instructorRouter = require('./routes/instructor');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

connectToDB()

app.use('/api/v1/a', adminRouter);
app.use('/api/v1/c', courseRouter);
app.use('/api/v1/i', instructorRouter);

module.exports = app;   