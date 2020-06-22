const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todayiRouter = require('./routes/todayi.route');
const path = require('path');
const authRouter = require('./routes/auth.route');
const commonRouter = require('./routes/common.route');

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

const origin = "http://localhost:3000"
app.use(
  cors({
    credentials: true,
    'Access-Control-Allow-Credentials' : true,
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    origin
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConn = mongoose.connect(process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => console.log('Connected to DB.'));

app.get('/createitem', function(req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    });
    
app.use('/api/todayi', todayiRouter);
app.use('/api/auth', authRouter);
app.use('/api/common', commonRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});