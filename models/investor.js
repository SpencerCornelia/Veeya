// Require mongoose package
const mongoose = require('mongoose');
require('mongoose-type-email');
const config = require('../config/database');
const db = mongoose.createConnection(config.database);
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Require models
const Wholesaler = require('./wholesaler');

// Define Investor schema with proper attributes
const InvestorSchema = mongoose.Schema({
  userType: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true
  },
  phoneNumber: {
    type: String
  },
  wholesalers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wholesaler'
  }],
  properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }]
});

const Investor = module.exports = db.model('Investor', InvestorSchema);

module.exports.registerInvestor = function(investor, callback) {
  Investor.findOne({ 'email': investor.email }, (err, user) => {
    if (err) {
      callback(true, {
        success: false,
        message: "Error registering investor."
      });
    } else if (user) {
      callback(true, {
        success: false,
        message: "Investor already exists"
      });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(investor.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          let newInvestor = new Investor({
            userType: "Investor",
            userName: investor.userName,
            password: hash,
            firstName: investor.firstName,
            lastName: investor.lastName,
            email: investor.email,
            phoneNumber: investor.phoneNumber
          });

          newInvestor.save((err) => {
            if (err) {
              callback(true, {
                success: false,
                message: "Error registering investor."
              });
            } else {
              callback(false, {
                success: true,
                message: "Successfully registered investor."
              });
            }
          });
        })
      });
    }
  });
};

module.exports.inviteInvestor = function(newInvestor, callback) {
  newInvestor.save(callback);
};

module.exports.getAllInvestors = function(callback) {
  Investor.find().exec(callback);
};

module.exports.getInvestorById = function(id, callback) {

};