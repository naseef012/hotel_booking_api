var express = require("express");
var app = express();
var path  = require('path');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
var db = require('./database');
var dbfunc = require('./db-function');
var http  = require('http')
var bodyParser = require('body-parser');
var AuthenticRoute = require('../app/routes/authentic.route');
let CustomerRoute = require('../app/routes/customer.route');
let RoomBookingRoute = require('../app/routes/room-booking.route');
var errorCode = require('../common/error-code')
var errorMessage = require('../common/error-methods')
var checkToken = require('./secureRoute');
let ejs = require('ejs');

// var schedule = require('node-schedule');
 
// var j = schedule.scheduleJob('*/1 * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });


dbfunc.connectionCheck.then((data) =>{
    //console.log(data);
 }).catch((err) => {
     console.log(err);
 });
 
 app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.set('views', path.join(__dirname, '../public'));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use(bodyParser.json());

app.use((req,res,next) => {
  let message = {
    "API_name": req.url,
    "REQUEST_BODY": req.body
  }
  console.log("=========== END_POINT ======= "+req.url);
  next();
});


var router = express.Router();
app.use('/api',router);
AuthenticRoute.init(router);

var secureApi = express.Router();

// app.set('public', path.join(__dirname, 'public'));
// app.set('view engine', 'ejs');

//set static folder
// app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware

app.use('/secureApi',secureApi);
secureApi.use(checkToken);


app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// index route
app.get('/', (req,res) => {
    res.render('index2', {message: "Hello From Backend"});
});

var ApiConfig = {
  app: app
}

CustomerRoute.init(secureApi);
RoomBookingRoute.init(secureApi);
module.exports = ApiConfig;
