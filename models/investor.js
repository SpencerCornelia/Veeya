// Require mongoose package
const mongoose = require('mongoose');
require('mongoose-type-email');
const config = require('../config/database');
const db = mongoose.createConnection(config.database);
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
  propertiesBought: []
});

const Investor = module.exports = db.model('Investor', InvestorSchema);

module.exports.registerInvestor = function(investor) {
  return new Promise((resolve, reject) => {
    Investor.findOne({ 'email': investor.email }, (error, user) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error registering investor.',
          error: error
        }
        reject(errorObj);
      } else if (user) {
        let userObj = {
          success: false,
          message: 'Investor already exists. If you are attempting to register a new investor, please head to login page. '
            + 'If you are attempting to invite an investor, please connect with the investor using our connection process.',
          error: ''
        }
        reject(userObj)
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(investor.password, salt, (error, hash) => {
            if (error) {
              let errorObj = {
                success: false,
                message: 'Error registering investor.',
                error: error
              }
              reject(errorObj);
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
                let errorObj = {
                  success: false,
                  message: 'Error registering investor.',
                  error: error
                }
                reject(errorObj);
              } else if (i) {
                let investorObj = {
                  success: true,
                  message: 'Successfully registered investor.',
                  data: i
                }
                resolve(investorObj);
              } else {
                let errorObj = {
                  success: false,
                  message: 'Unable to save investor.',
                  error: ''
                }
                reject(errorObj);
              }
            });
          })
        });
      }
    });
  });
};

module.exports.getAllInvestors = function() {
  return new Promise((resolve, reject) => {
    Investor.find().exec((error, investors) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error retrieving investor.',
          error: error
        }
        reject(errorObj);
      } else if (investors) {
        let successObj = {
          success: true,
          message: 'Successfully retrieved investors.',
          data: investors
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to find investors.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};

module.exports.getInvestorById = function(id) {
  return new Promise((resolve, reject) => {
    Investor.findById(id, (error, investor) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Unable to retrieve investor by id.'
        }
        reject(errorObj);
      } else if (investor) {
        let successObj = {
          success: true,
          message: 'Successfully found investor by id.',
          data: investor
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Investor not found by id.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};

module.exports.getInvestorByEmail = function(email) {
  return new Promise((resolve, reject) => {
    Investor.findOne({ 'email': email }, (error, user) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Unable to retrieve investor with email entered into application.',
          error: error
        }
        reject(errorObj);
      } else if (user) {
        let successObj = {
          success: true,
          message: 'Successfully found investor.',
          data: user
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Investor not found with email entered into application.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
}

module.exports.getPropertiesForInvestor = function(id) {
  return new Promise((resolve, reject) => {
    Investor.findById(id, (error, investor) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error retrieving properties for investor.',
          error: error
        }
        reject(errorObj);
      } else if (investor) {
        let successObj = {
          success: true,
          message: 'Successfully retrieved properties for investor.',
          data: investor.properties,
          error: ''
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to retrieve properties for investor.',
          error: ''
        }
        reject(errorObj);
      }
    })
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

module.exports.addWholesalerConnection = function(wholesaler, investorEmail, investorID) {
  let query = {};
  let ObjectId = mongoose.Types.ObjectId;

  if (investorID) {
    query["_id"] = new ObjectId(investorID);
  } else {
    query["email"] = investorEmail;
  }
  return new Promise((resolve, reject) => {
    Investor.findOneAndUpdate(
      query,
      { $push: { wholesalers: wholesaler } },
      { safe: true, upsert: true, new: true },
      function(error, i) {
        if (error) {
          let errorObj = {
            success: false,
            message: 'Error updating investor.',
            error: error
          }
          reject(errorObj);
        } else if (i) {
          let successObj = {
            success: true,
            message: 'Successfully updated investor.',
            data: i
          }
          resolve(successObj);
        } else {
          let errorObj = {
            success: false,
            message: 'Unable to update investor.',
            error: ''
          }
          reject(errorObj);
        }
      }
    );
  });
}