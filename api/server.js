const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todayiRouter = require('./routes/todayi.route');
const path = require('path');
const authRouter = require('./routes/auth.route');

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConn = mongoose.connect(process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => console.log('Connected to DB.'));

app.get('/createitem', function(req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    });
    
app.use('/items', todayiRouter);
app.use('/users', authRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});