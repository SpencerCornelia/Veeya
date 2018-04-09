// Require mongoose package
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('../config/database');
var db = mongoose.createConnection(config.database);

const Property = require('./property');
const User = require('./user');

const BidSchema = mongoose.Schema({
  propertyId: {
    type: String
  },
  closingTime: {
    type: Date
  },
  bids: [{
    userId: {
      type: String
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    amount: {
      type: String
    },
    bidPlacedTime: {
      type: Date,
      default: Date.now
    }
  }]
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Bid = module.exports = db.model('Bid', BidSchema);

module.exports.getBidsByPropertyId = function(propertyId) {
  return new Promise((resolve, reject) => {
    Bid.findOne({ 'propertyId': propertyId }, (error, property) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error retrieving bids.',
          error: error
        }
        reject(errorObj);
      } else if (property) {
        let successObj = {
          success: true,
          message: 'Successfully retrieved all bids.',
          data: {
            bids: property.bids,
            closingTime: property.closingTime
          }
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to retrieve bids.',
          error: ''
        }
        reject(errorObj);
      }
    })
  });
};

module.exports.establishAuction = function(propertyId) {
  return new Promise((resolve, reject) => {
    Bid.findOne({ 'propertyId': propertyId }, (error, property) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error retrieving bids.',
          error: error
        }
        reject(errorObj);
      } else {

        let bid = new Bid({
          propertyId: propertyId
        });

        bid.save((error, newBid) => {
          if (error) {
            let errorObj = {
              success: false,
              message: 'Error retrieving bids.',
              error: error
            }
            reject(errorObj);
          } else if (newBid) {
            let successObj = {
              success: true,
              message: 'Successfully established auction.',
              data: newBid
            }
            resolve(successObj);
          } else {
            if (error) {
              let errorObj = {
                success: false,
                message: 'Error retrieving bids.',
                error: error
              }
              reject(errorObj);
            }
          }
        });
      }
    });
  });
};