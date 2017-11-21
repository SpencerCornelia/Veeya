// We will declare all our dependencies here
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const propertiesController = require('./controllers/propertiesController');
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');

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

// express.static is a built in middleware function to serve static files.
// We are telling express server public folder is the place to look for the static files
app.use(express.static(path.join(__dirname, 'public')));

// This is the home page
app.get('/', (req,res) => {
  // need to send this route to /login or /register
  // or check if session id and send to /home
  res.send("Home page");
});

app.use('/login', loginController);

app.use('/register', registerController);

// Route all HTTP requests to propertiesController
app.use('/properties', propertiesController);

//Listen to port 3000
app.listen(port, () => {
  console.log(`Starting the server at port ${port}`);
});