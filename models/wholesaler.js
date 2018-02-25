// Require mongoose package
const mongoose = require('mongoose');
require('mongoose-type-email');
const bcrypt = require('bcrypt');
const config = require('../config/database');
var db = mongoose.createConnection(config.database);

const WholesalerSchema = mongoose.Schema({
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
  properties: [],
  investors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investor'
  }]
});

const Wholesaler = module.exports = db.model('Wholesaler', WholesalerSchema);

module.exports.getWholesalerById = function(id) {
  return new Promise((resolve, reject) => {
    Wholesaler.findById(id, (error, wholesaler) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error retrieving wholesaler.',
          error: error
        }
        reject(errorObj);
      } else if (wholesaler) {
        let successObj = {
          success: true,
          message: 'Successfully retrieved wholesaler.',
          data: wholesaler
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to find wholesaler.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};

module.exports.getWholesalerByEmail = function(email) {
  return new Promise((resolve, reject) => {
    Wholesaler.findOne({ 'email': email }, (err, user) => {
      if (err) {
        let errorObj = {
          success: false,
          message: 'Error finding wholesaler.'
        }
        reject(errorObj);
      } else if (user) {
        let successObj = {
          success: true,
          message: 'Successfully found wholesaler.',
          data: user
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to login. Please try again.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};

module.exports.registerWholesaler = function(wholesaler) {
  return new Promise((resolve, reject) => {
    Wholesaler.findOne({ 'email': wholesaler.email }, (error, user) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error registering wholesaler.',
          error: error
        }
        reject(errorObj);
      }

      if (user) {
        let userObj = {
          success: false,
          message: 'Wholesaler already exists.',
          error: ''
        }
        reject(userObj);
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(wholesaler.password, salt, (error, hash) => {
            if (error) {
              let errorObj = {
                success: false,
                message: 'Error registering wholesaler',
                error: error
              }
              reject(errorObj);
            }

            let newWholesaler = new Wholesaler({
              userType: "Wholesaler",
              userName: wholesaler.userName,
              password: hash,
              firstName: wholesaler.firstName,
              lastName: wholesaler.lastName,
              email: wholesaler.email,
              phoneNumber: wholesaler.phoneNumber
            });

            newWholesaler.save((error, wholesaler) => {
              if (error) {
                let errorObj = {
                  success: false,
                  message: 'Error registering wholesaler.',
                  error: error
                }
                reject(errorObj);
              } else if (wholesaler) {
                let wholesalerObj = {
                  success: true,
                  message: 'Successfully registered wholesaler.',
                  data: wholesaler
                }
                resolve(wholesalerObj);
              } else {
                let errorObj = {
                  success: false,
                  message: 'Unable to register wholesaler.',
                  error: ''
                }
                reject(errorObj);
              }
            });
          });
        });
      }
    });
  });
};

module.exports.getPropertiesForWholesaler = function(id, callback) {
  return new Promise((resolve, reject) => {
    Wholesaler.findOne({_id: id}, (error, wholesalerData) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error retrieving wholesaler.',
          error: error
        }
        reject(errorObj);
      } else if (wholesalerData) {
        let successObj = {
          success: true,
          message: 'Successfully retrieving wholesaler.',
          data: wholesalerData
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to find wholesaler.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};

module.exports.addInvestorConnection = function(investor, wholesalerID) {
  return new Promise((resolve, reject) => {
    Wholesaler.findOneAndUpdate(
      { _id: wholesalerID },
      { $push: { investors: investor }},
      {safe: true, upsert: true, new: true},
      function(error, w) {
        if (error) {
          let errorObj = {
            success: false,
            message: 'Unable to update wholesaler.',
            error: error
          }
          reject(errorObj);
        } else if (w) {
          let successObj = {
            success: true,
            message: 'Successfully added investor as a connection.',
            data: w
          }
          resolve(successObj);
        } else {
          let errorObj = {
            success: false,
            message: 'Unable to add investor as a connection.',
            error: ''
          }
          reject(errorObj);
        }
      }
    );
  })
};

module.exports.updatePropertyForWholesaler = function(property) {
  return new Promise((resolve, reject) => {
    let index = 0;
    Wholesaler.findOne({_id: property.wholesaler}, (error, wholesaler) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error finding wholesaler.',
          error: error
        }
        reject(errorObj)
      } else {
        var prop = wholesaler.properties.forEach((p, i) => {
          if(p._id == property._id) {
            index = i;
          }
        });
        wholesaler.properties[index] = property;
        wholesaler.markModified('properties');
        wholesaler.save(function(error, wholesaler) {
          if (error) {
            let errorObj = {
              success: false,
              message: 'Error saving wholesaler.',
              error: error
            }
            reject(error);
            return;
          } else if (wholesaler) {
            let successObj = {
              success: true,
              message: 'Successfully updated wholesaler.',
              data: property
            }
            resolve(successObj);
          } else {
            let errorObj = {
              success: false,
              message: 'Unable to save wholesaler.',
              error: ''
            }
            reject(errorObj);
          }
        });
      }
    });
  });
};

module.exports.getAllWholesalers = function(callback) {
  return new Promise((resolve, reject) => {
    Wholesaler.find().exec((error, wholesalers) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error finding all wholesalers.'
        }
        reject(errorObj);
      } else if (wholesalers) {
        let successObj = {
          success: true,
          message: 'Successfully retrieved all wholesalers.',
          data: wholesalers
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to find wholesaler',
          error: ''
        }
        reject(errorObj);
      }
    });
  })
};

module.exports.comparePassword = function(attemptedPassword, wholesalerPassword, callback) {
  bcrypt.compare(attemptedPassword, wholesalerPassword, (error, isMatch) => {
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
};

