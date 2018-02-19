// We will declare all our dependencies here
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const jwt = require('passport-jwt');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const propertiesController = require('./controllers/propertiesController');
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
const wholesalerController = require('./controllers/wholesalerController');
const investorController = require('./controllers/investorController');

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
require('./config/wholesalerPassport.js')(passport);
require('./config/investorPassport.js')(passport);

// express.static is a built in middleware function to serve static files.
// We are telling express server public folder is the place to look for the static files
app.use(express.static(path.join(__dirname, 'public')));

// Set headers
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS, PATCH');
  next();
});

// This is the home page
app.get('/', (req,res) => {
  res.send("Home page");
});

// Route all HTTP requests to loginController
app.use('/login', loginController);

// Route all HTTP requests to registerController
app.use('/register', registerController);

// Route all HTTP requests to wholesalerController
app.use('/wholesaler', wholesalerController);

// Route all HTTP requests to propertiesController
app.use('/properties', propertiesController);

// Route all HTTP requests to investorController
app.use('/investor', investorController);

// Route for 404. Looks like app-routing.ts handles the variable ('**') route instead of this
app.get('*', function(req, res, next) {
  res.status(404).send("Sorry but that page does not exist");
});

//Listen to port 3000
app.listen(port, () => {
  console.log(`Starting the server at port ${port}`);
});