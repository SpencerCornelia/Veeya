// We will declare all our dependencies here
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const jwt = require('passport-jwt');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const adsController = require('./controllers/adsController');
const investorController = require('./controllers/investorController');
const lenderController = require('./controllers/lenderController');
const loginController = require('./controllers/loginController');
const propertiesController = require('./controllers/propertiesController');
const registerController = require('./controllers/registerController');
const userController = require('./controllers/userController');
const wholesalerController = require('./controllers/wholesalerController');

// Connect mongoose to our database
const config = require('./config/database');
mongoose.createConnection(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Initialize our app variable
const app = express();

//Declaring Port
const port = 3000;

//Middleware for CORS
app.use(cors());

//Middleware for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/userPassport.js')(passport);

// serves index.html located here. All files in front-end will need to have a route from this location.
app.use(express.static(path.join(__dirname, '/angular-src')));
app.use(express.static(path.join(__dirname, '/angular-src/src/')));

// Set headers
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS, PATCH');
  next();
});

// Route all HTTP requests to adsController
app.use('/ads', adsController);

// Route all HTTP requests to investorController
app.use('/investor', investorController);

// Route all HTTP requests to lenderController
app.use('/lender', lenderController);

// Route all HTTP requests to loginController
app.use('/login', loginController);

// Route all HTTP requests to propertiesController
app.use('/properties', propertiesController);

// Route all HTTP requests to registerController
app.use('/register', registerController);

// Route all HTTP requests to userController
app.use('/user', userController);

// Route all HTTP requests to wholesalerController
app.use('/wholesaler', wholesalerController);


//Listen to port 3000
app.listen(port, () => {
  console.log(`Starting the server at port ${port}`);
});