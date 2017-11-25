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
  // will probably need to do same thing with investors
  // change it to array which makes it easier to display data
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
          console.log("err:", err);
        }
      }
    );
  }
  newInvestor.save(callback);
};

