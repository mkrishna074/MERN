const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todayiRouter = require('./routes/todayi.route');
const path = require('path');
const authRouter = require('./routes/auth.route');
const commonRouter = require('./routes/common.route');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

   // DB connection
const dbConn = mongoose.connect(process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => console.log('Connected to DB.'));

    // test endpoint
app.get('/createitem', function(req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    });
    
    // routes
app.use('/api/todayi', todayiRouter);
app.use('/api/auth', authRouter);
app.use('/api/common', commonRouter);

    //port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('todayi/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'todayi', 'build', 'index.html'));
  })
}