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
  deadline: {
    type: String
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
    profilePhoto: {
      type: String
    },
    amount: {
      type: String
    },
    bidPlacedTime: {
      type: String
    },
    bidPlacedDate: {
      type: String
    }
  }],
  auctionOpen: {
    type: String,
    default: 'true'
  }
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
            deadline: property.deadline
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

module.exports.establishAuction = function(propertyId, deadline) {
  return new Promise((resolve, reject) => {
    Bid.findOne({ 'propertyId': propertyId }, (error, property) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error retrieving bids.',
          error: error
        }
        reject(errorObj);
      } else if (!property) {

        let bid = new Bid({
          propertyId: propertyId,
          deadline: deadline
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

module.exports.addBid = function(bidData) {
  let propertyId = bidData.propertyId;

  Bid.findOne({ 'propertyId': propertyId }, (error, property) => {
    let newBid = {
      userId: bidData.userId,
      firstName: bidData.firstName,
      lastName: bidData.lastName,
      city: bidData.city,
      state: bidData.state,
      profilePhoto: bidData.profilePhoto,
      amount: bidData.amount,
      bidPlacedTime: bidData.bidPlacedTime,
      bidPlacedDate: bidData.bidPlacedDate
    }

    property.bids.push(newBid);

    property.save((error, newProperty) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error saving bid.',
          error: error
        }
      } else if (newProperty) {
        let successObj = {
          success: true,
          message: 'Successfully added bid.',
          data: newProperty
        }
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to save property.',
          error: ''
        }
      }
    });
  });
};

module.exports.endAuction = function(propertyId, newDeadline) {
  return new Promise((resolve, reject) => {
    Bid.findOne({ 'propertyId': propertyId }, (error, property) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error ending auction.',
          error: error
        }
        reject(errorObj);
      } else if (property) {

        property.deadline = newDeadline;
        property.auctionOpen = 'false';

        property.save((error, newProperty) => {
          if (error) {
            let errorObj = {
              success: false,
              message: 'Error ending auction.',
              error: error
            }
            reject(errorObj);
          } else if (newProperty) {
            let successObj = {
              success: true,
              message: 'Successfully ended auction.',
              data: newProperty
            }
            resolve(successObj);
          } else {
            let errorObj = {
              success: false,
              message: 'Unable to end auction.',
              error: ''
            }
            reject(errorObj);
          }
        })
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to end auction.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
};