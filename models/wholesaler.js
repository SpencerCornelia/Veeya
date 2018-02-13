// Require mongoose package
const mongoose = require('mongoose');
require('mongoose-type-email');
const bcrypt = require('bcrypt');
const config = require('../config/database');
var db = mongoose.createConnection(config.database);

// Define Wholesaler schema with proper attributes
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

module.exports.getWholesalerById = function(id, callback) {
  Wholesaler.findById(id, callback);
};

module.exports.addWholesaler = function(newWholesaler, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newWholesaler.password, salt, (err, hash) => {
      if (err) {
        throw err;
      }
      newWholesaler.password = hash;
      newWholesaler.save(callback);
    });
  });
};

module.exports.getPropertiesForWholesaler = function(id, callback) {
  Wholesaler.findOne({_id: id}, callback);
};

module.exports.addInvestorToWholesaler = function(newInvestor, wholesalerID, callback) {
  if (wholesalerID) {
    Wholesaler.findOneAndUpdate(
      {_id: wholesalerID},
      {$push: {investors: newInvestor}},
      {safe: true, upsert: true},
      function(err, s) {
        if (err) {
          console.log("error adding investor to wholesaler:", err);
        }
      }
    );
  }
  newInvestor.save(callback);
};

module.exports.updatePropertyForWholesaler = function(property, callback) {
  Wholesaler.findOne({_id: property.wholesaler}, (err, wholesaler) => {
    if (err) {
      console.log("error finding wholesaler:", err);
    } else {
      var prop = wholesaler.properties.filter((p) => {
        return p._id == property._id;
      });
      prop[0] = property;
      callback(prop[0]);
    }
  });
  // Wholesaler.findOneAndUpdate(
  //   {_id: property._id},
  //   {
  //     address: property.address,
  //     city: property.city,
  //     state: property.state,
  //     zipCode: property.zipCode,
  //     purchasePrice: property.purchasePrice,
  //     bedrooms: property.bedrooms,
  //     bathrooms: property.bathrooms,
  //     rehabCostMin: property.rehabCostMin,
  //     rehabCostMax: property.rehabCostMax,
  //     afterRepairValue: property.afterRepairValue,
  //     averageRent: property.averageRent,
  //     squareFootage: property.squareFootage,
  //     propertyType: property.propertyType,
  //     yearBuilt: property.yearBuilt,
  //     status: property.status,
  //     comps: property.comps
  //   },
  //   {
  //     runValidators: true
  //   },
  //   callback()
  // );
};

