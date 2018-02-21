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
  Investor.findOne({ 'email': investor.email }, (error, user) => {
    if (error) {
      callback(true, {
        success: false,
        message: 'Error registering investor.',
        error: error
      });
    } else if (user) {
      callback(true, {
        success: false,
        message: 'Investor already exists. Please head to Login page.'
      });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(investor.password, salt, (error, hash) => {
          if (error) {
            callback(true, {
              success: false,
              message: 'Error registering investor.',
              error: error
            });
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

          newInvestor.save((error, i) => {
            if (error) {
              callback(true, {
                success: false,
                message: 'Error registering investor.'
              });
            } else if (i) {
              callback(false, {
                success: true,
                message: 'Successfully registered investor.',
                data: i
              });
            } else {
              callback(true, {
                success: false,
                message: 'Unable to save investor.',
                error: ''
              });
            }
          });
        })
      });
    }
  });
};

module.exports.inviteInvestor = function(newInvestor, callback) {
  newInvestor.save((error, investor) => {
    if (error) {
      callback(true, {
        success: false,
        message: 'Error saving investor.',
        error: error
      });
    } else if (investor) {
      callback(false, {
        success: true,
        message: 'Successfully invited investor.',
        data: investor
      });
    } else {
      callback(true, {
        success: false,
        message: 'Unable to save investor.',
        error: ''
      });
    }
  });
};

module.exports.getAllInvestors = function(callback) {
  Investor.find().exec((error, investors) => {
    if (error) {
      callback(true, {
        success: false,
        message: 'Error retrieving investor.',
        error: error
      });
    } else if (investors) {
      callback(false, {
        success: true,
        message: 'Successfully retrieved investors.',
        data: investors
      });
    } else {
      callback(true, {
        success: false,
        message: 'Unable to find investors.',
        error: ''
      });
    }
  });
};

module.exports.getInvestorById = function(id, callback) {
  Investor.findById(id, (error, investor) => {
    if (error) {
      callback(true, {
        success: false,
        message: 'Unable to retrieve investor by id.'
      });
    } else if (investor) {
      callback(false, {
        success: true,
        message: 'Successfully found investor by id.',
        data: investor
      });
    } else {
      callback(true, {
        success: false,
        message: 'Investor not found by id.',
        error: ''
      });
    }
  });
};

module.exports.getInvestorByEmail = function(email, callback) {
  Investor.findOne({ 'email': email }, (error, user) => {
    if (error) {
      callback(true, {
        success: false,
        message: 'Unable to retrieve investor with email entered into application.',
        error: error
      });
    } else if (user) {
      callback(false, {
        success: true,
        message: 'Successfully found investor.',
        data: user
      });
    } else {
      callback(true, {
        success: false,
        message: 'Investor not found with email entered into application.',
        error: ''
      });
    }
  });
}

module.exports.comparePassword = function(attemptedPassword, investorPassword, callback) {
  bcrypt.compare(attemptedPassword, investorPassword, (error, isMatch) => {
    if (error) {
      callback(true, {
        success: false,
        message: 'Invalid login credentials. Please try again.',
        error: error
      });
    } else if (isMatch) {
      callback(false, {
        success: true,
        message: 'Success.'
      });
    } else {
      callback(true, {
        success: false,
        message: 'Invalid login credentials. Please try again.',
        error: ''
      });
    }
  });
}