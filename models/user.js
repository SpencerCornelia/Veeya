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
    type: String
  },
  userName: {
    type: String
  },
  password: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: mongoose.SchemaTypes.Email
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
  connections: [],
  pendingIncomingConnectionRequests: [],
  pendingOutgoingConnectionRequests: [],
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
  terms : [],
  ads: []
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
  let validated = validateUser(userBody);

  if (validated) {
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
  } else {
    return new Promise((resolve, reject) => {
      let errorObj = {
        success: false,
        message: 'New user inputs are not valid. Please try again.',
        error: ''
      }
      reject(errorObj);
    })
  }
};

module.exports.registerInvitedUser = function(userBody) {
  let validated = validateUser(userBody);

  if (validated) {
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
          let randomString = Math.random().toString(36).slice(-8);
          let newUser = new User({
            userType: userBody.userType,
            userName: '',
            password: randomString,
            firstName: '',
            lastName: '',
            email: userBody.email,
            phoneNumber: '',
            city: '',
            state: '',
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
        }
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      let errorObj = {
        success: false,
        message: 'Error inviting new user.',
        error: error
      }
      reject(errorObj);
    });
  }
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
        wholesaler.wholesalerListedProperties.forEach((property) => {
          properties.push(property);
        });
        wholesaler.wholesalerSoldProperties.forEach((property) => {
          properties.push(property);
        });
        wholesaler.wholesalerSoldPendingProperties.forEach((property) => {
          properties.push(property);
        });
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

module.exports.addWholesalerListing = function(propertyId, wholesalerId) {
  return new Promise((resolve, reject) => {
    User.findById(wholesalerId, (error, wholesaler) => {
      wholesaler.wholesalerListedProperties.push(propertyId);
      wholesaler.save((error, newWholesaler) => {
        if (error) {
          let errorObj = {
            success: false,
            message: 'Error adding a listing for user.',
            error: error
          }
          reject(errorObj);
        } else if (newWholesaler) {
          let successObj = {
            success: true,
            message: 'Successfully added listing for user.',
            data: newWholesaler
          }
          resolve(successObj);
        } else {
          let errorObj = {
            success: false,
            message: 'Unable to add listing for user.',
            error: ''
          }
          reject(errorObj);
        }
      });
    });
  });
};

module.exports.addInvestorConnection = function(investorId, wholesalerId) {
  return new Promise((resolve, reject) => {
    User.findById(wholesalerId, (error, wholesaler) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error inviting user.',
          error: error
        }
        reject(errorObj);
      } else if (wholesaler) {
        wholesaler.connections.push(investorId);
        wholesaler.save((error, newWholesaler) => {
          if (error) {
            let errorObj = {
              success: false,
              message: 'Error inviting user.',
              error: error
            }
            reject(errorObj);
          } else if (newWholesaler) {
            let successObj = {
              success: true,
              message: 'Successfully added user.',
              data: newWholesaler
            }
            resolve(successObj);
          } else {
            let errorObj = {
              success: false,
              message: 'Unable to invite user. Please try again.',
              error: ''
            }
            reject(errorObj);
          }
        });
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to add connection. Please try again.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};

module.exports.updateWholesalerSoldPendingProperties = function(wholesalerId, propertyId, deny) {
  return new Promise((resolve, reject) => {
    User.findById(wholesalerId, (error, wholesaler) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error found with marking property as pending sale.',
          error: error
        }
        reject(errorObj);
      } else if (wholesaler) {
        let newListed = [];

        for (let i = 0; i < wholesaler.wholesalerListedProperties.length; i++) {
          if (propertyId != wholesaler.wholesalerListedProperties[i]) {
            newListed.push(wholesaler.wholesalerListedProperties[i]);
          }
        }

        wholesaler.wholesalerListedProperties = newListed;
        if (!deny) {
          wholesaler.wholesalerSoldPendingProperties.push(propertyId);
        }
        wholesaler.save((error, updatedWholesaler) => {
          if (error) {
            let errorObj = {
              success: false,
              message: 'Error marking property as pending sale.',
              error: error
            }
            reject(errorObj);
          } else if (updatedWholesaler) {
            let successObj = {
              success: true,
              message: 'Successfully updated wholesaler.',
              data: updatedWholesaler
            }
            resolve(successObj);
          } else {
            let errorObj = {
              success: false,
              message: 'Unable to mark property as pending sale.',
              error: ''
            }
            reject(errorObj);
          }
        });

      } else {
        let errorObj = {
          success: false,
          message: 'Unable to mark property as pending sale. Please try again.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};

module.exports.updateWholesalerSoldProperties = function(wholesalerId, propertyId) {
  return new Promise((resolve, reject) => {
    User.findById(wholesalerId, (error, wholesaler) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error found with marking property as sold.',
          error: error
        }
        reject(errorObj);
      } else if (wholesaler) {
        let newSoldPending = [];

        for (let i = 0; i < wholesaler.wholesalerSoldPendingProperties.length; i++) {
          if (propertyId != wholesaler.wholesalerSoldPendingProperties[i]) {
            newSoldPending.push(wholesaler.wholesalerSoldPendingProperties[i]);
          }
        }

        wholesaler.wholesalerSoldPendingProperties = newSoldPending;
        wholesaler.wholesalerSoldProperties.push(propertyId);
        wholesaler.save((error, updatedWholesaler) => {
          if (error) {
            let errorObj = {
              success: false,
              message: 'Error marking property as sold.',
              error: error
            }
            reject(errorObj);
          } else if (updatedWholesaler) {
            let successObj = {
              success: true,
              message: 'Successfully updated wholesaler.',
              data: updatedWholesaler
            }
            resolve(successObj);
          } else {
            let errorObj = {
              success: false,
              message: 'Unable to mark property as sold.',
              error: ''
            }
            reject(errorObj);
          }
        });

      } else {
        let errorObj = {
          success: false,
          message: 'Unable to mark property as sold. Please try again.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
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

        investor.investorBoughtProperties.forEach((property) => {
          properties.push(property);
        });
        investor.investorBoughtPendingProperties.forEach((property) => {
          properties.push(property);
        });
        investor.investorStarredProperties.forEach((property) => {
          properties.push(property);
        });

        investor.save((error, updatedInvestor) => {
          if (error) {
            let errorObj = {
              success: false,
              message: 'Error retrieving properties for user.',
              error: error
            }
            reject(errorObj);
          } else if (updatedInvestor) {
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

module.exports.addWholesalerConnection = function(wholesalerId, investorId) {
  return new Promise((resolve, reject) => {
    User.findById(investorId, (error, investor) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error inviting user.',
          error: error
        }
        reject(errorObj);
      } else if (investor) {
        investor.connections.push(wholesalerId);
        investor.save((error, newInvestor) => {
          if (error) {
            let errorObj = {
              success: false,
              message: 'Error inviting user.',
              error: error
            }
            reject(errorObj);
          } else if (newInvestor) {
            let successObj = {
              success: true,
              message: 'Successfully invited user.',
              data: newInvestor
            }
            resolve(successObj);
          } else {
            let errorObj = {
              success: false,
              message: 'Unable to invite user.',
              error: ''
            }
            reject(errorObj);
          }
        });
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to invite user. Please try again.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};

module.exports.updateInvestorBoughtPendingProperties = function(investorId, propertyId, deny) {
  return new Promise((resolve, reject) => {
    User.findById(investorId, (error, investor) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error found with marking property as pending sale.',
          error: error
        }
        reject(errorObj);
      } else if (investor) {

        if (deny) {
          let newBoughtPending = [];
          for (let i = 0; i < investor.investorBoughtPendingProperties.length; i++) {
            if (propertyId != investor.investorBoughtPendingProperties[i]) {
              newBoughtPending.push(investor.investorBoughtPendingProperties[i]);
            }
          }
          investor.investorBoughtPendingProperties = newBoughtPending;
        } else {
          investor.investorBoughtPendingProperties.push(propertyId);
        }

        investor.save((error, updatedInvestor) => {
          if (error) {
            let errorObj = {
              success: false,
              message: 'Error marking property as pending sale.',
              error: error
            }
            reject(errorObj);
          } else if (updatedInvestor) {
            let successObj = {
              success: true,
              message: 'Successfully marked property as pending sale.',
              data: updatedInvestor
            }
            resolve(successObj);
          } else {
            let errorObj = {
              success: false,
              message: 'Unable to mark property as pending sale.',
              error: ''
            }
            reject(errorObj);
          }
        });

      } else {
        let errorObj = {
          success: false,
          message: 'Unable to mark property as pending sale. Please try again.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};

module.exports.updateInvestorBoughtProperties = function(investorId, propertyId) {
  return new Promise((resolve, reject) => {
    User.findById(investorId, (error, investor) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error found with marking property as sold.',
          error: error
        }
        reject(errorObj);
      } else if (investor) {
        let newBoughtPending = [];

        for (let i = 0; i < investor.investorBoughtPendingProperties.length; i++) {
          if (propertyId != investor.investorBoughtPendingProperties[i]) {
            newBoughtPending.push(investor.investorBoughtPendingProperties[i]);
          }
        }

        investor.investorBoughtPendingProperties = newBoughtPending;
        investor.investorBoughtProperties.push(propertyId);

        investor.save((error, updatedInvestor) => {
          if (error) {
            let errorObj = {
              success: false,
              message: 'Error marking property as sold.',
              error: error
            }
            reject(errorObj);
          } else if (updatedInvestor) {
            let successObj = {
              success: true,
              message: 'Successfully marked property as sold.',
              data: updatedInvestor
            }
            resolve(successObj);
          } else {
            let errorObj = {
              success: false,
              message: 'Unable to mark property as sold.',
              error: ''
            }
            reject(errorObj);
          }
        });

      } else {
        let errorObj = {
          success: false,
          message: 'Unable to mark property as sold. Please try again.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};

module.exports.addDealAd = function(adBody) {
  let id = adBody.investorId;
  return new Promise((resolve, reject) => {
    User.findById(id, (error, investor) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error placing new ad.',
          error: error
        }
        reject(errorObj);
      } else if (investor) {
        investor.ads.push(adBody._id);
        investor.save((error, savedInvestor) => {
          if (error) {
            let errorObj = {
              success: false,
              message: 'Error placing new ad.',
              error: error
            }
            reject(errorObj);
          } else if (savedInvestor) {
            let successObj = {
              success: true,
              message: 'Successfully added new ad.',
              data: investor
            }
            resolve(successObj);
          } else {
            let errorObj = {
              success: false,
              message: 'Unable to place new ad. Please try again.',
              error: ''
            }
            reject(errorObj);
          }
        });
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to place new ad. Please try again.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
}

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

module.exports.addLenderConnection = function(lenderId, userId) {
  return new Promise((resolve, reject) => {
    User.findById(userId, (error, user) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error updating user.',
          error: error
        }
        reject(errorObj);
      } else if (user) {
        user.connections.push(lenderId);
        user.save((error, savedUser) => {
          if (error) {
            let errorObj = {
              success: false,
              message: 'Error updating user.',
              error: error
            }
            reject(errorObj);
          } else if (savedUser) {
            let successObj = {
              success: true,
              message: 'Successfully added connection.',
              data: savedUser
            }
            resolve(successObj);
          } else {
            let errorObj = {
              success: false,
              message: 'Unable to invite user. Please try again',
              error: ''
            }
            reject(errorObj);
          }
        });
      } else {
        let errorObj = {
          success: false,
          message: 'Error updating user.',
          error: error
        }
        reject(errorObj);
      }
    });
  });
};

module.exports.addUserConnectionForLender = function(userId, lenderId) {
  return new Promise((resolve, reject) => {
    User.findById(lenderId, (error, lender) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error adding connection for user.',
          error: error
        }
        reject(errorObj);
      } else if (lender) {
        lender.connections.push(userId);
        lender.save((error, newLender) => {
          if (error) {
            let errorObj = {
              success: false,
              message: 'Error adding connection for user.',
              error: error
            }
            reject(errorObj);
          } else if (newLender) {
            let successObj = {
              success: true,
              message: 'Successfully added connection for user.',
              data: newLender
            }
            resolve(successObj);
          } else {
            let errorObj = {
              success: false,
              message: 'Unable to add connection for user.',
              error: ''
            }
            reject(errorObj);
          }
        });
      } else {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Unable to add connection for user. Please try again.',
          error: ''
        }
        reject(errorObj);
      }
      }
    });
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
        lender.lenderLoanedProperties.forEach((property) => {
          properties.push(property);
        });
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
          message: 'Unable to retrieve user.'
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
          message: 'User not found.',
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
          message: 'Error finding user.',
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
          message: 'User not found.',
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

module.exports.getAllConnectionsByIDs = function(IDs) {
  return new Promise((resolve, reject) => {
    let connections = [];
    IDs.forEach((id, index) => {
      User.findById(id, (error, user) => {
        if (error) {
          let errorObj = {
            success: false,
            message: 'Error getting connections for user.',
            error: error
          }
          reject(errorObj);
        } else if (user) {
          connections.push(user);
          if (index === IDs.length-1) {
            let successObj = {
              success: true,
              message: 'Successfully retrieved all connections.',
              data: connections
            }
            resolve(successObj);
          }
        } else {
          let errorObj = {
            success: false,
            message: 'Unable to retrieve connections for user. Please try again.',
            error: ''
          }
          reject(errorObj);
        }
      });
    });
  });
};

module.exports.getPendingConnections = function(userId) {
  return new Promise((resolve, reject) => {
    User.findById(userId, (error, user) => {
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
          data: user.pendingIncomingConnectionRequests
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

module.exports.getAdIDs = function(userId) {
  return new Promise((resolve, reject) => {
    User.findById(userId, (error, investor) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error getting ad deals.',
          error: error
        }
        reject(errorObj);
      } else if (investor) {
        let successObj = {
          success: true,
          message: 'Successfully retrieved ad id\'s.',
          data: investor.ads
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to retrieve ads. Please try again.',
          error: ''
        }
        reject(errorObj);
      }
    });
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

module.exports.addOutgoingConnectionRequest = function(currentUserId, connectedUserId) {
  return new Promise((resolve, reject) => {
    User.findById(currentUserId, (error, user) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error adding connection request.',
          error: error
        }
        reject(errorObj);
      } else if (user) {
        user.pendingOutgoingConnectionRequests.push(connectedUserId);
        user.save((error, newUser) => {
          if (error) {
            let errorObj = {
              success: false,
              message: 'Error sending connection request. Please try again.',
              error: error
            }
            reject(errorObj);
          } else if (newUser) {
            let successObj = {
              success: true,
              message: 'Successfully sent connection request.',
              data: newUser
            }
            resolve(successObj);
          } else {
            let errorObj = {
              success: false,
              message: 'Unable to send connection request. Please try again.',
              error: ''
            }
            reject(errorObj);
          }
        });
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to send connection request. Please try again.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};

module.exports.addIncomingConnectionRequest = function(currentUserId, connectedUserId) {
  return new Promise((resolve, reject) => {
    User.findById(connectedUserId, (error, user) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error adding connection request.',
          error: error
        }
        reject(errorObj);
      } else if (user) {
        user.pendingIncomingConnectionRequests.push(currentUserId);
        user.save((error, newUser) => {
          if (error) {
            let errorObj = {
              success: false,
              message: 'Error sending connection request. Please try again.',
              error: error
            }
            reject(errorObj);
          } else if (newUser) {
            let successObj = {
              success: true,
              message: 'Successfully sent connection request.',
              data: newUser
            }
            resolve(successObj);
          } else {
            let errorObj = {
              success: false,
              message: 'Unable to send connection request. Please try again.',
              error: ''
            }
            reject(errorObj);
          }
        });
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to send connection request. Please try again.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};

module.exports.acceptConnectionCurrentUser = function(body) {
  let userId = body.userId;
  let connectionUserId = body.connectionUserId;
  return new Promise((resolve, reject) => {
    User.findById(userId, (error, currentUser) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error accepting connection request. Please try again.',
          error: error
        }
        reject(errorObj);
      } else if (currentUser) {
        let newIncoming = [];
        for (let i = 0; i < currentUser.pendingIncomingConnectionRequests.length; i++) {
          if (!currentUser.pendingIncomingConnectionRequests[i] == connectionUserId) {
            newIncoming.push(currentUser.pendingIncomingConnectionRequests[i]);
          }
        }

        currentUser.connections.push(connectionUserId);
        currentUser.pendingIncomingConnectionRequests = newIncoming;
        currentUser.save((error, savedCurrentUser) => {
          if (error) {
            let errorObj = {
              success: false,
              message: 'Error accepting connection request. Please try again.',
              error: error
            }
            reject(errorObj);
          } else if (savedCurrentUser) {
            let successObj = {
              success: true,
              message: 'Successfully added connection.',
              data: savedCurrentUser
            }
            resolve(successObj);
          } else {
            let errorObj = {
              success: false,
              message: 'Unable to complete connection request. Please try again.',
              error: ''
            }
            reject(errorObj);
          }
        });
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to complete connection request. Please try again.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};

module.exports.acceptConnectionConnectedUser = function(body) {
  let userId = body.userId;
  let connectionUserId = body.connectionUserId;

  return new Promise((resolve, reject) => {
    User.findById(connectionUserId, (error, connectedUser) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error accepting connection request. Please try again.',
          error: error
        }
        reject(errorObj);
      } else if (connectedUser) {
        let newOutgoing = [];
        for (let i = 0; i < connectedUser.pendingOutgoingConnectionRequests.length; i++) {
          if (!connectedUser.pendingOutgoingConnectionRequests[i] == userId) {
            newOutgoing.push(currentUser.pendingOutgoingConnectionRequests[i]);
          }
        }

        connectedUser.connections.push(userId);
        connectedUser.pendingOutgoingConnectionRequests = newOutgoing;
        connectedUser.save((error, savedConnectedUser) => {
          if (error) {
            let errorObj = {
              success: false,
              message: 'Error accepting connection request. Please try again.',
              error: error
            }
            reject(errorObj);
          } else if (savedConnectedUser) {
            let successObj = {
              success: true,
              message: 'Successfully added connection.',
              data: savedConnectedUser
            }
            resolve(successObj);
          } else {
            let errorObj = {
              success: false,
              message: 'Unable to completing connection request. Please try again.',
              error: ''
            }
            reject(errorObj);
          }
        });
      }
    });
  });
};

module.exports.denyConnectionCurrentUser = function(body) {
  let userId = body.userId;
  let connectionUserId = body.connectionUserId;

  return new Promise((resolve, reject) => {
    User.findById(userId, (error, currentUser) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error denying connection request. Please try again.',
          error: error
        }
        reject(errorObj);
      } else if (currentUser) {
        let newIncoming = [];
        for (let i = 0; i < currentUser.pendingIncomingConnectionRequests.length; i++) {
          if (!currentUser.pendingIncomingConnectionRequests[i] == connectionUserId) {
            newIncoming.push(currentUser.pendingIncomingConnectionRequests[i]);
          }
        }

        currentUser.pendingIncomingConnectionRequests = newIncoming;
        currentUser.save((error, savedCurrentUser) => {
          if (error) {
            let errorObj = {
              success: false,
              message: 'Error denying connection request. Please try again.',
              error: error
            }
            reject(errorObj);
          } else if (savedCurrentUser) {
            let successObj = {
              success: true,
              message: 'Successfully denied connection request.',
              data: savedCurrentUser
            }
            resolve(successObj);
          } else {
            let errorObj = {
              success: false,
              message: 'Unable to deny connection request. Please try again.',
              error: ''
            }
            reject(errorObj);
          }
        });
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to deny connection request. Please try again.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};

module.exports.denyConnectionConnectedUser = function(body) {
  let userId = body.userId;
  let connectionUserId = body.connectionUserId;

  return new Promise((resolve, reject) => {
    User.findById(connectionUserId, (error, connectedUser) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error denying connection request. Please try again.',
          error: error
        }
        reject(errorObj);
      } else if (connectedUser) {
        let newOutgoing = [];
        for (let i = 0; i < connectedUser.pendingOutgoingConnectionRequests.length; i++) {
          if (!connectedUser.pendingOutgoingConnectionRequests[i] == userId) {
            newOutgoing.push(currentUser.pendingOutgoingConnectionRequests[i]);
          }
        }

        connectedUser.pendingOutgoingConnectionRequests = newOutgoing;
        connectedUser.save((error, savedConnectedUser) => {
          if (error) {
            let errorObj = {
              success: false,
              message: 'Error denying connection request. Please try again.',
              error: error
            }
            reject(errorObj);
          } else if (savedConnectedUser) {
            let successObj = {
              success: true,
              message: 'Successfully denied connection request.',
              data: savedConnectedUser
            }
            resolve(successObj);
          } else {
            let errorObj = {
              success: false,
              message: 'Unable to deny connection request. Please try again.',
              error: ''
            }
            reject(errorObj);
          }
        });
      }
    });
  });
};

module.exports.addUsersFromUpload = function(usersList) {
  return new Promise((resolve, reject) => {
    let lastIndex = usersList.length - 1;
    let connectionsToAdd = [];

    usersList.forEach((user, index) => {

      User.findOne({ 'email': user.email }, (errorFindingUser, foundUser) => {
        if (errorFindingUser) {
          let errorObj = {
            success: false,
            message: 'Error adding users from uploaded list.',
            error: error
          }
          reject(errorObj);
        } else if (!foundUser) {
          let randomString = Math.random().toString(36).slice(-8);
          let newUser = new User({
            userType: user.userType,
            userName: user.userName,
            password: randomString,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            city: user.city,
            state: user.state,
            profileViews: 0,
            profilePhoto: 'https://firebasestorage.googleapis.com/v0/b/veeya-c0185.appspot.com/o/default-profile-image%2Fdefault-profile-image.jpg?alt=media&token=cb5fd586-a920-42eb-9a82-59cc9020aaed',
            URLs: {
              personal: '',
              facebook: '',
              linkedIn: '',
              biggerPockets: ''
            }
          });

          newUser.connections[0] = user.connectionId;

          newUser.save((error, savedUser) => {
            if (error) {
              let errorObj = {
                success: false,
                message: 'Error saving user.',
                error: error
              }
              reject(errorObj);
            } else if (savedUser) {
              connectionsToAdd.push(savedUser._id);
              if (index == lastIndex) {
                let successObj = {
                  success: true,
                  message: 'Successfully added new users.',
                  data: connectionsToAdd
                }
                resolve(successObj);
              }
            } else {
              let errorObj = {
                success: false,
                message: 'Unable to save user.',
                error: ''
              }
              reject(errorObj);
            }
          });
        } else if (foundUser) {
          if (index == lastIndex) {
            let successObj = {
              success: true,
              message: 'Successfully added new users.',
              data: connectionsToAdd
            }
            resolve(successObj);
          }
        } else {
          let errorObj = {
            success: false,
            message: 'Unable to add at least one user from upload.',
            error: ''
          }
          reject(errorObj);
        }
      });

    });

  });
};

module.exports.addConnections = function(IDs, userId) {
  return new Promise((resolve, reject) => {
    User.findById(userId, (error, user) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error adding connections to user.',
          error: error
        }
        reject(errorObj);
      } else if (user) {

        if (IDs.length == 0) {
          let successObj = {
              success: true,
              message: 'Successfully added connections.',
              data: savedUser
            }
          resolve(successObj);
        } else {
          IDs.forEach((id) => {
            user.connections.push(id);
          });

          user.save((error, savedUser) => {
            if (error) {
              let errorObj = {
                success: false,
                message: 'Error updating user.',
                error: error
              }
              reject(errorObj);
            } else if (savedUser) {
              let successObj = {
                success: true,
                message: 'Successfully added connections.',
                data: savedUser
              }
              resolve(successObj);
            } else {
              let errorObj = {
                success: false,
                message: 'Unable to save user. Please try again',
                error: ''
              }
              reject(errorObj);
            }
          });
        }

      } else {
        if (error) {
          let errorObj = {
            success: false,
            message: 'Unable to add connections to user. Please try again.',
            error: error
          }
          reject(errorObj);
        }
      }
    });
  });
};

module.exports.deleteUser = function(userId) {
  return new Promise((resolve, reject) => {
    User.findById(userId, (error, user) => {
      user.connections.forEach((connectionId) => {
        User.findById(connectionId, (error, connectionUser) => {
          connectionUser.connections = connectionUser.connections.filter((id) => {
            return id != userId;
          });
        });
      })
    });

    User.findByIdAndRemove(userId, (error, deletedUser) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error deleting user.',
          error: error
        }
        reject(errorObj);
      } else if (deletedUser) {
        let successObj = {
          success: true,
          message: 'Successfully deleted user.',
          data: null
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Error deleting user.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};

/*
===== VALIDATION =====
*/

let validateUser = function(data) {
  if (data.userName) {
    if (!validateUsername(data.userName)) {
      return false;
    }
  }

  if (data.firstName) {
    if (!validateFirstName(data.firstName)) {
      return false;
    }
  }

  if (data.lastName) {
    if (!validateLastName(data.lastName)) {
      return false;
    }
  }

  if (data.email) {
    if (!validateEmail(data.email)) {
      return false;
    }
  }

  if (data.phoneNumber) {
    if (!validatePhoneNumber(data.phoneNumber)) {
      return false;
    }
  }

  if (data.city) {
    if (!validateCity(data.city)) {
      return false;
    }
  }

  if (data.state) {
    if (!validateState(data.state)) {
      return false;
    }
  }

  if (data.userType) {
    if (!validateUserType(data.userType)) {
      return false;
    }
  }

  return true;
};

let validateUsername = function(username) {
  let userNamePattern = new RegExp("^[a-zA-Z0-9-]+");
  if (userNamePattern.test(username)) {
    return true;
  } else {
    return false;
  }
};

let validateFirstName = function(firstname) {
  let firstNamePattern = new RegExp("^[a-zA-Z ]+$");
  if (firstNamePattern.test(firstname)) {
    return true;
  } else {
    return false;
  }
};

let validateLastName = function(lastname) {
  let lastNamePattern = new RegExp("^[a-zA-Z ]+$");
  if (lastNamePattern.test(lastname)) {
    return true;
  } else {
    return false;
  }
};

let validatePassword = function(password) {
  let passwordPattern = password.length >= 5 && password.length <= 30;
  if (passwordPattern) {
    return true;
  } else {
    return false;
  }
};

let validateEmail = function(email) {
  let emailPattern = new RegExp("^(([^<>()\\[\\]\\.,;:\\s@']+(\\.[^<>()\\[\\]\\.,;:\\s@']+)*)|('.+'))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$");
  if (emailPattern.test(email)) {
    return true;
  } else {
    return false;
  }
};

let validatePhoneNumber = function(number) {
  let phoneNumberPattern = new RegExp("^(\\+0?1\\s)?\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$");
  if (phoneNumberPattern.test(number)) {
    return true;
  } else {
    return false;
  }
};

let validateCity = function(city) {
  let cityPattern = new RegExp("^[a-zA-Z ]*$");
  if (cityPattern.test(city)) {
    return true;
  } else {
    return false;
  }
};

let validateState = function(state) {
  let statePattern = state.length == 2;
  if (statePattern) {
    return true;
  } else {
    return false;
  }
};

let validateUserType = function(type) {
  let userTypePattern = false;
  if (type == 'Wholesaler' || type == 'Investor' || type == 'Lender') {
    userTypePattern = true;
  }
  return userTypePattern;
};

