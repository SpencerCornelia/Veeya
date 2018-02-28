// Require mongoose package
const mongoose = require('mongoose');
require('mongoose-type-email');
const config = require('../config/database');
const db = mongoose.createConnection(config.database);
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = mongoose.Schema({
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
  connections: [],
  profilePhoto: {
    type: String
  },
  minimumLoanAvailable: {
    type: String
  },
  maximumLoanAvailable: {
    type: String
  },
  terms : []
});

const User = module.exports = db.model('User', UserSchema);

/*
===== REGISTER && PASSWORD =====
*/

module.exports.registerUser = function(userBody) {
  return new Promise((resolve, reject) => {
    User.findOne({ 'email': userBody.email }, (error, user) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error registering user.',
          error: error
        }
        reject(errorObj);
      } else if (user) {
        let userObj = {
          success: false,
          message: 'Email already exists. If you are attempting to login using this email, please head to login page. '
            + 'If you are attempting to invite a user, please request a connection with the user using our Add Connection feature.',
          error: ''
        }
        reject(userObj)
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(userBody.password, salt, (error, hash) => {
            if (error) {
              let errorObj = {
                success: false,
                message: 'Error registering user.',
                error: error
              }
              reject(errorObj);
            }
            let newUser = new User({
              userType: userBody.userType,
              userName: userBody.userName,
              password: hash,
              firstName: userBody.firstName,
              lastName: userBody.lastName,
              email: userBody.email,
              phoneNumber: userBody.phoneNumber
            });

            newUser.save((error, savedUser) => {
              if (error) {
                let errorObj = {
                  success: false,
                  message: 'Error registering user.',
                  error: error
                }
                reject(errorObj);
              } else if (savedUser) {
                let investorObj = {
                  success: true,
                  message: 'Successfully registered user.',
                  data: savedUser
                }
                resolve(investorObj);
              } else {
                let errorObj = {
                  success: false,
                  message: 'Unable to save user.',
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

module.exports.comparePassword = function(attemptedPassword, userPassword, callback) {
  bcrypt.compare(attemptedPassword, userPassword, (error, isMatch) => {
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




/*
===== WHOLESALER GETTERS BEGIN =====
*/

module.exports.getAllWholesalers = function() {
  return new Promise((resolve, reject) => {
    User.find({ 'userType': 'Wholesaler' }).exec((error, wholesalers) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error retrieving wholesalers.',
          error: error
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
          message: 'Unable to find wholesalers.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};

module.exports.getWholesalerById = function(id) {
  let ObjectId = mongoose.Types.ObjectId;
  let searchId = new ObjectId(id);
  return new Promise((resolve, reject) => {
    User.find({ 'userType': 'Wholesaler', '_id': searchId }, (error, wholesaler) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error finding wholesaler.',
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
          message: 'Unable to retrieve wholesaler. Please try again.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};

/*
===== WHOLESALER GETTERS END =====
*/



/*
===== WHOLESALER SETTERS BEGIN =====
*/

module.exports.updatePropertyForWholesaler = function(property) {
  return new Promise((resolve, reject) => {
    let index = 0;
    User.findOne({_id: property.wholesaler}, (error, wholesaler) => {
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

module.exports.addInvestorConnection = function(investor, wholesalerID) {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(
      { _id: wholesalerID },
      { $push: { connections: investor }},
      {safe: true, upsert: true, new: true},
      function(error, user) {
        if (error) {
          let errorObj = {
            success: false,
            message: 'Unable to update wholesaler.',
            error: error
          }
          reject(errorObj);
        } else if (user) {
          let successObj = {
            success: true,
            message: 'Successfully invited user.',
            data: user
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

/*
===== WHOLESALER SETTERS END =====
*/




/*
===== INVESTOR GETTERS BEGIN =====
*/

module.exports.getAllInvestors = function() {
  return new Promise((resolve, reject) => {
    User.find({ 'userType': 'Investor' }).exec((error, investors) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error retrieving investors.',
          error: error
        }
        reject(errorObj);
      } else if (investors) {
        let successObj = {
          success: true,
          message: 'Successfully retrieved all investors.',
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
  let ObjectId = mongoose.Types.ObjectId;
  let searchId = new ObjectId(id);
  console.log("searchId:", searchId)
  return new Promise((resolve, reject) => {
    User.find({ 'userType': 'Investor', '_id': searchId }, (error, investor) => {
      console.log("investor:", investor)
      console.log("error:", error)
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error finding investor.',
          error: error
        }
        reject(errorObj);
      } else if (investor) {
        let successObj = {
          success: true,
          message: 'Successfully retrieved investor.',
          data: investor
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to retrieve investor. Please try again.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};

/*
===== INVESTOR GETTERS END =====
*/




/*
===== INVESTOR SETTERS BEGIN =====
*/

module.exports.addWholesalerConnection = function(wholesaler, investorEmail, investorID) {
  console.log("wholesaler:", wholesaler)
  console.log("investorEmail:",investorEmail)
  console.log("investorID:", investorID)

  let query = {};
  let ObjectId = mongoose.Types.ObjectId;

  if (investorID) {
    query["_id"] = new ObjectId(investorID);
  } else {
    query["email"] = investorEmail;
  }
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(
      query,
      { $push: { connections: wholesaler } },
      { safe: true, upsert: true, new: true },
      function(error, user) {
        console.log("user after update:", user)
        if (error) {
          let errorObj = {
            success: false,
            message: 'Error updating user.',
            error: error
          }
          reject(errorObj);
        } else if (user) {
          let successObj = {
            success: true,
            message: 'Successfully invited user.',
            data: user
          }
          resolve(successObj);
        } else {
          let errorObj = {
            success: false,
            message: 'Unable to update user.',
            error: ''
          }
          reject(errorObj);
        }
      }
    );
  });
};

/*
===== INVESTOR SETTERS END =====
*/



/*
===== USER GETTERS BEGIN =====
*/
module.exports.getUserById = function(id) {
  return new Promise((resolve, reject) => {
    User.findById(id, (error, user) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Unable to retrieve user by id.'
        }
        reject(errorObj);
      } else if (user) {
        let successObj = {
          success: true,
          message: 'Successfully found user by id.',
          data: user
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'User not found by id.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};

module.exports.getUserByEmail = function(email) {
  return new Promise((resolve, reject) => {
    User.findOne({ 'email': email }, (error, user) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Unable to retrieve user with email entered into application.',
          error: error
        }
        reject(errorObj);
      } else if (user) {
        let successObj = {
          success: true,
          message: 'Successfully found user.',
          data: user
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'User not found with email entered into application.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};

module.exports.getPropertiesForUser = function(id) {
  return new Promise((resolve, reject) => {
    User.findById(id, (error, user) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error retrieving properties for user.',
          error: error
        }
        reject(errorObj);
      } else if (user) {
        let successObj = {
          success: true,
          message: 'Successfully retrieved properties for user.',
          data: user.properties,
          error: ''
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to retrieve properties for user.',
          error: ''
        }
        reject(errorObj);
      }
    })
  });
};

/*
===== USER GETTERS END =====
*/


