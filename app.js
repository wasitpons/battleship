const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const connection = require('./connection.js');
var defaultRouter = require('./routes/defaultRouter.js');
const PORT = process.env.PORT || 5000

connection.connect();
app.set('port', (process.env.PORT || 5000));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', defaultRouter);
app.listen(PORT, function () {
    console.log('API LISTENNING ON PORT ' + PORT);
});