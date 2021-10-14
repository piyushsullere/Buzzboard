// // BASE SETUP
const express = require('express');
const app = express();
//const router = express.Router();
const apiRoutes = express.Router(); 
const port = process.env.PORT || 8080;  // 8000: production, 8080: testserver

// Middlewares 
const http = require('http');
var bodyParser 	= require('body-parser');
const secure = require('./config/secure.js');

// Routes
const database = require('./config/db');
const cors = require('cors');


 
// Routes 
const apiOrdersRouteController = require('./api/routecontrollers/orders.js');


// API ROUTES -------------------
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json())

// get an instance of the router for api routes
app.use(cors());
app.options('*', cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', apiRoutes);

// apies for order
app.get('/api/v1/order/get/by/id', apiOrdersRouteController.getOrderByObjectId);
app.get('/api/v1/order/list/get/by/date', apiOrdersRouteController.getOrderListByDate);
app.post('/api/v1/order/create',apiOrdersRouteController.addOrder);
app.post('/api/v1/order/update',apiOrdersRouteController.updateOrderByObjectId);
app.delete('/api/v1/order/remove',apiOrdersRouteController.removeOrderByObjectId);


//connect mongodb
var mongoose 		= require('mongoose');
const db = require('./config/db').url
mongoose.connect(db, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});

//port
app.listen(8080, function(err, data){
    console.log("server is running on 8080 port")
  })




//______________________________________________________________
//BASE SETUP
// var express = require('express');
// var app 	= express();
// var router	= express.Router();

// // Middlewares 
// var http 				= require('http');
// var bodyParser 			= require('body-parser');
// var secure				= require('./config/secure.js')


// // Routes
// const apiOrdersRouteController = require('./api/routecontrollers/orders.js');

// var database   = require('./config/db');
// var genRes     = require('./api/controllers/genres.js');
// var cors       = require('cors');


// // API ROUTES -------------------
// app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
// app.use(bodyParser.json())

// // get an instance of the router for api routes
// var apiRoutes = express.Router(); 
// app.use(cors());
// app.options('*', cors());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });


// // unsecure apies for users
// app.post('/api/v1/order/create', apiOrdersRouteController.addOrder)
// app.get('/api/v1/order/get', apiOrdersRouteController.getOrders)



// //connect mongodb
// var mongoose 		= require('mongoose');
// const db = require('./config/db').url
// mongoose.connect(db, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log("Successfully connected to the database");    
// }).catch(err => {
//     console.log('Could not connect to the database.', err);
//     process.exit();
// });

// //port
// app.listen(3000, function(err, data){
//   console.log("server is running on 3000 port")
// })