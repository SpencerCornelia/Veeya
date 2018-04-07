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

module.exports.placeNewAd = function(data) {
  let investorId = data.investorId;

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
        let newAd = new Ad(data);
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
};

module.exports.getDealAds = function(adIdArray) {
  return new Promise((resolve, reject) => {
    let allAds = [];
    let lastAd = adIdArray.length - 1;
    adIdArray.forEach((id, index) => {
      Ad.findById(id, (error, ad) => {
        if (error) {
          let errorObj = {
            success: false,
            message: 'Error retrieving ads.',
            error: error
          }
          reject(errorObj);
        } else if (ad) {
          allAds.push(ad);
          if (index == lastAd) {
            let successObj = {
              success: true,
              message: 'Successfully retrieved all ads.',
              data: allAds
            }
            resolve(successObj);
          }
        } else {
          let errorObj = {
            success: false,
            message: 'Error retrieving ads. Please try again.',
            error: ''
          }
          reject(errorObj);
        }
      })
    })
  });
};

module.exports.getAllAds = function() {
  return new Promise((resolve, reject) => {
    Ad.find((error, ads) => {
      if (ads.length == 0) {
        let successObj = {
          success: true,
          message: 'Successfully retrieved all ads.',
          data: ads
        }
        resolve(successObj);
      } else {
        if (error) {
          let errorObj = {
            success: false,
            message: 'Error retrieving ads.',
            error: error
          }
          reject(errorObj);
        } else if (ads) {
          let successObj = {
            success: true,
            message: 'Successfully retrieved all ads.',
            data: ads
          }
          resolve(successObj);
        } else {
          let errorObj = {
            success: false,
            message: 'Unable to retrieve all ads.',
            error: ''
          }
          reject(errorObj);
        }
      }
    });
  });
};

module.exports.deleteAd = function(adId) {
  return new Promise((resolve, reject) => {
    Ad.findByIdAndRemove(adId, (error, ad) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error deleting ad.',
          error: error
        }
        reject(errorObj);
      } else if (ad) {
        let successObj = {
          success: true,
          message: 'Successfully deleted ad.',
          data: null
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Error deleting ad.',
          error: error
        }
        reject(errorObj);
      }
    });
  });
};

