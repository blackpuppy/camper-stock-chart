'use strict';

var bodyParser = require('body-parser'),
    express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    session = require('express-session');

var app = express();
require('dotenv').load();

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set("view engine", "pug");
app.set('views', path.join(__dirname, 'app/pug'));

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/public/js', express.static(process.cwd() + '/node_modules'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
    secret: 'camper-stock-chart',
    resave: false,
    saveUninitialized: true
}));

var routes = require('./app/routes/index.js');
routes(app);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
    console.log('Node.js listening on port ' + port + '...');
});
