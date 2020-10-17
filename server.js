const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer');
const mongoose = require('mongoose');
const route = require('./router/router')
const config = require('./config/config')
var path = require('path');
var cors = require('cors')

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'uploads')));
app.get('/', function (req, res) {
    res.json({ message: 'WELCOME' });
});
app.use('/', route)

app.listen(3000, () => console.log('Server started on port 3000'));
mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    (err, data) => {
        if (err) {
            console.log('error in database connection', err);

        } else {
            console.log('Database connected successFully');
        }
    })
