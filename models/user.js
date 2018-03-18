// Require mongoose package
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('mongoose-type-email');
const config = require('../config/database');
const db = mongoose.createConnection(config.database);
const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const keys = require('../config/keys.js');

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
  city: {
    type: String
  },
  state: {
    type: String
  },
  investorBoughtProperties: [],
  investorBoughtPendingProperties: [],
  investorStarredProperties: [],
  wholesalerListedProperties: [],
  wholesalerSoldProperties: [],
  wholesalerSoldPendingProperties: [],
  lenderLoanedProperties: [],
  connections: [{
    type: Object
  }],
  profilePhoto: {
    type: String
  },
  profileViews: {
    type: Number,
    default: 0
  },
  URLs: {
    personal: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedIn: {
      type: String
    },
    biggerPockets: {
      type: String
    }
  },
  minimumLoanAvailable: {
    type: String
  },
  maximumLoanAvailable: {
    type: String
  },
  terms : []
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

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
              phoneNumber: userBody.phoneNumber,
              city: userBody.city,
              state: userBody.state,
              profileViews: 0,
              profilePhoto: 'https://firebasestorage.googleapis.com/v0/b/veeya-c0185.appspot.com/o/default-profile-image%2Fdefault-profile-image.jpg?alt=media&token=cb5fd586-a920-42eb-9a82-59cc9020aaed',
              URLs: {
                personal: '',
                facebook: '',
                linkedIn: '',
                biggerPockets: ''
              }
            });

            newUser.save((error, savedUser) => {
              const token = jwt.sign(savedUser.toJSON(), keys.secret, {
                expiresIn: 604800
              });
              if (error) {
                let errorObj = {
                  success: false,
                  message: 'Error registering user.',
                  error: error
                }
                reject(errorObj);
              } else if (savedUser) {
                delete savedUser.password;
                let investorObj = {
                  success: true,
                  message: 'Successfully registered user.',
                  data: savedUser,
                  token: 'JWT ' + token
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
          });
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
        wholesalers.forEach((w) => {
          delete w.password;
        });
        let successObj = {
          success: true,
          message: 'Successfully retrieved all wholesalers.',
          data: wholesalers
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to find wholesalers. Please try again.',
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
        delete wholesaler.password;
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

module.exports.searchWholesaler = function(email, userName, phoneNumber) {
  return new Promise((resolve, reject) => {
    User.find({
      'userType': 'Wholesaler',
      $or:[{ 'email': email }, { 'userName': userName }, { 'phoneNumber': phoneNumber }]
    }, (error, user) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error searching for investor.',
          error: error
        }
        reject(errorObj);
      } else if (user.length > 0) {
        user.forEach((u) => {
          delete u.password;
        });
        let successObj = {
          success: true,
          message: 'Successfully retrieved investor.',
          data: user
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to find an investor with those search parameters.',
          error: ''
        }
        reject(errorObj);
      }
    })
  });
};

module.exports.getPropertiesForWholesaler = function(wholesalerId) {
  return new Promise((resolve, reject) => {
    User.findById(wholesalerId, (error, wholesaler) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error retrieving properties for user.',
          error: error
        }
        reject(errorObj);
      } else if (wholesaler) {
        let properties = [];
        properties.concat(wholesaler.wholesalerListedProperties);
        properties.concat(wholesaler.wholesalerSoldProperties);
        properties.concat(wholesaler.wholesalerSoldPendingProperties);
        let successObj = {
          success: true,
          message: 'Successfully retrieved properties for user.',
          data: properties
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
    });
  });
};


/*
===== WHOLESALER GETTERS END =====
*/



/*
===== WHOLESALER SETTERS BEGIN =====
*/

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
            message: 'Error inviting investor.',
            error: error
          }
          reject(errorObj);
        } else if (user) {
          delete user.password;
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
        investors.forEach((investor) => {
          delete investor.password;
        });
        let successObj = {
          success: true,
          message: 'Successfully retrieved all investors.',
          data: investors
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to find investors. Please try again.',
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

  return new Promise((resolve, reject) => {
    User.find({ 'userType': 'Investor', '_id': searchId }, (error, investor) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error finding investor.',
          error: error
        }
        reject(errorObj);
      } else if (investor) {
        delete investor.password;
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

module.exports.searchInvestor = function(email, userName, phoneNumber) {
  return new Promise((resolve, reject) => {
    User.find({
      'userType': 'Investor',
      $or:[{ 'email': email }, { 'userName': userName }, { 'phoneNumber': phoneNumber }]
    }, (error, user) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error searching for investor.',
          error: error
        }
        reject(errorObj);
      } else if (user.length > 0) {
        user.forEach((u) => {
          delete u.password;
        })
        let successObj = {
          success: true,
          message: 'Successfully retrieved investor.',
          data: user
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to find an investor with those search parameters.',
          error: ''
        }
        reject(errorObj);
      }
    })
  });
};

module.exports.getPropertiesForInvestor = function(investorId) {
  return new Promise((resolve, reject) => {
    User.findById(investorId, (error, investor) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error retrieving properties for user.',
          error: error
        }
        reject(errorObj);
      } else if (investor) {
        let properties = [];
        properties.concat(investor.investorBoughtProperties);
        properties.concat(investor.investorBoughtPendingProperties);
        properties.concat(investor.investorStarredProperties);
        let successObj = {
          success: true,
          message: 'Successfully retrieved properties for user.',
          data: properties
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
        if (error) {
          let errorObj = {
            success: false,
            message: 'Error updating user.',
            error: error
          }
          reject(errorObj);
        } else if (user) {
          delete user.password;
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
===== LENDER GETTERS BEGIN=====
*/

module.exports.getAllLenders = function() {
  return new Promise((resolve, reject) => {
    User.find({ 'userType': 'Lender' }).exec((error, lenders) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error retrieving lenders.',
          error: error
        }
        reject(errorObj);
      } else if (lenders) {
        lenders.forEach((lender) => {
          delete lender.password;
        });
        let successObj = {
          success: true,
          message: 'Successfully retrieved all lenders.',
          data: lenders
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to find lenders. Please try again.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};

module.exports.searchLender = function(email, userName, phoneNumber) {
  return new Promise((resolve, reject) => {
    User.find({
      'userType': 'Lender',
      $or:[{ 'email': email }, { 'userName': userName }, { 'phoneNumber': phoneNumber }]
    }, (error, user) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error searching for lender.',
          error: error
        }
        reject(errorObj);
      } else if (user.length > 0) {
        let successObj = {
          success: true,
          message: 'Successfully retrieved lender.',
          data: user
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to find a lender with those search parameters.',
          error: ''
        }
        reject(errorObj);
      }
    })
  });
};



/*
===== LENDER SETTERS BEGIN =====
*/

module.exports.addLenderConnection = function(user, user_id) {
  let query = {};
  let ObjectId = mongoose.Types.ObjectId;
  query["_id"] = new ObjectId(user_id);

  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(
      query,
      { $push: { connections: user } },
      { safe: true, upsert: true, new: true },
      function(error, updatedUser) {
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
            data: updatedUser
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

module.exports.addUserConnectionForLender = function(user, lenderID) {
  let query = {};
  let ObjectId = mongoose.Types.ObjectId;
  query["_id"] = new ObjectId(lenderID);

  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(
      query,
      { $push: { connections: user } },
      { safe: true, upsert: true, new: true },
      function(error, updatedUser) {
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
            data: updatedUser
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

module.exports.getPropertiesForLender = function(lenderId) {
  return new Promise((resolve, reject) => {
    User.findById(lenderId, (error, lender) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error retrieving properties for user.',
          error: error
        }
        reject(errorObj);
      } else if (lender) {
        let properties = [];
        properties.concat(lender.lenderLoanedProperties);
        let successObj = {
          success: true,
          message: 'Successfully retrieved all properties for user.',
          data: properties
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
    });
  });
};

/*
===== LENDER SETTERS END =====
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
        delete user.password;
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
        delete user.password;
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

module.exports.getAllConnections = function(id) {
  return new Promise((resolve, reject) => {
    User.findById(id, (error, user) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error retrieving connections for user.',
          error: error
        }
        resolve(errorObj);
      } else if (user) {
        let successObj = {
          success: true,
          message: 'Successfully retrieved user connections.',
          data: user.connections
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to retrieve connections for user.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};

module.exports.getAllUsers = function() {
  return new Promise((resolve, reject) => {
    User.find({}, (error, users) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error retrieving users.',
          error: error
        }
        reject(errorObj);
      } else if (users) {
        users.forEach((user) => {
          delete user.password;
        });
        let successObj = {
          success: true,
          message: 'Successfully retrieved all users.',
          data: users
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to retrieve all users.',
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

/*
===== USER SETTERS BEGIN =====
*/

module.exports.increaseViewCount = function(userId) {
  return new Promise((resolve, reject) => {
    User.findById(userId, (error, user) => {
      user.profileViews = user.profileViews + 1;
      user.save((error, newUser) => {
        if (error) {
          let errorObj = {
            success: false,
            message: 'Error updating user. Please try again.',
            error: error
          }
          reject(errorObj);
        } else if (newUser) {
          let successObj = {
            success: true,
            message: 'Successfully increased view count.',
            data: newUser
          }
          resolve(successObj);
        } else {
          let errorObj = {
            success: false,
            message: 'Error updating user. Please try again.',
            error: error
          }
          reject(errorObj);
        }
      });
    });
  });
};

module.exports.updateUserMyProfileInfo = function(userData) {
  let id = userData._id;
  return new Promise((resolve, reject) => {
    User.findById(id, (error, user) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error updating user. Please try again.',
          error: error
        }
        reject(errorObj);
      } else if (user) {
        user.userName = userData.userName;
        user.firstName = userData.firstName;
        user.lastName = userData.lastName;
        user.email = userData.email;
        user.phoneNumber = userData.phoneNumber;
        user.city = userData.city;
        user.state = userData.state;
        user.URLs.personal = userData.URLs.personal;
        user.URLs.facebook = userData.URLs.facebook;
        user.URLs.linkedIn = userData.URLs.linkedIn;
        user.URLs.biggerPockets = userData.URLs.biggerPockets;
        user.save((error, newUser) => {
          if (error) {
            let errorObj = {
              success: false,
              message: 'Error updating user. Please try again.',
              error: error
            }
            reject(errorObj);
          } else if (newUser) {
            let successObj = {
              success: true,
              message: 'Successfully updated user.',
              data: newUser
            }
            resolve(successObj);
          } else {
            let errorObj = {
              success: false,
              message: 'Unable to update user. Please try again.',
              error: ''
            }
            reject(errorObj);
          }
        })
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to update user. Please try again.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};

module.exports.updateProfilePhoto = function(id, photoURL) {
  return new Promise((resolve, reject) => {
    User.findById(id, (error, user) => {
      user.profilePhoto = photoURL;
      user.save((error, user) => {
        if (error) {
          let errorObj = {
            success: false,
            message: 'Error updating user. Please try again.',
            error: error
          }
          reject(errorObj);
        } else if (user) {
          let successObj = {
            success: true,
            message: 'Successfully updated user profile photo.',
            data: user
          }
          resolve(successObj);
        } else {
          let errorObj = {
            success: false,
            message: 'Unable to save profile image. Please try again.',
            error: ''
          }
          reject(errorObj);
        }
      })
    });
  });
}

module.exports.updatePassword = function(passwordBody) {
  return new Promise((resolve, reject) => {
    User.findById(passwordBody._id, (error, user) => {
      this.comparePassword(passwordBody.currentPassword, user.password, (error, success) => {
        if (error) {
          let errorObj = {
            success: false,
            message: 'Error updating password. Please try again.',
            error: error
          }
          reject(errorObj);
        } else if (success) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(passwordBody.newPassword, salt, (error, hash) => {
              if (error) {
                let errorObj = {
                  success: false,
                  message: 'Error registering user.',
                  error: error
                }
                reject(errorObj);
              }
              user.password = hash;
              user.save((error, updatedUser) => {
                if (error) {
                  let errorObj = {
                    success: false,
                    message: 'Error updating password. Please try again.',
                    error: error
                  }
                  reject(errorObj);
                } else if (success) {
                  delete updatedUser.password;
                  let successObj = {
                    success: true,
                    message: 'Successfully updated password for user.',
                    data: updatedUser
                  }
                  resolve(successObj);
                } else {
                  let errorObj = {
                    success: false,
                    message: 'Unable to update password. Please try again.',
                    error: ''
                  }
                  reject(errorObj);
                }
              });
            });
          });
        } else {
          let errorObj = {
            success: false,
            message: 'Unable to update password. Please try again.',
            error: ''
          }
          reject(errorObj);
        }
      });
    });
  });
};
