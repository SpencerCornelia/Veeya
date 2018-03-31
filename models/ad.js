// Require mongoose package
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('../config/database');
var db = mongoose.createConnection(config.database);

const User = require('./user');

const AdSchema = mongoose.Schema({
  investorId: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zipCode: {
    type: String
  },
  bedrooms: {
    type: String
  },
  bathrooms: {
    type: String
  },
  squareFootage: {
    type: String
  },
  yearBuilt: {
    type: String
  },
  sellerFinancing: {
    type: String
  },
  purchasePrice: {
    type: String
  },
  capRate: {
    type: String
  },
  netOperatingIncome: {
    type: String
  },
  propertyType: {
    type: String
  },
  cashOnCashReturn: {
    type: String
  },
  internalRateOfReturn: {
    type: String
  }
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Ad = module.exports = db.model('Ad', AdSchema);

module.exports.placeNewAd = function(body) {
  let investorId = body.investorId;

  return new Promise((resolve, reject) => {
    User.findById(investorId, (error, investor) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error placing new ad. User not found.',
          error: error
        }
        reject(errorObj);
      } else if (investor) {
        let newAd = new Ad(body.newAd);
        newAd.save((error, savedAd) => {
          if (error) {
            let errorObj = {
              success: false,
              message: 'Error saving new ad.',
              error: error
            }
            reject(errorObj);
          } else if (savedAd) {
            let successObj = {
              success: true,
              message: 'Successfully placed new ad.',
              data: savedAd
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
    })
  });
}

