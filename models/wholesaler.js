// Require mongoose package
const mongoose = require('mongoose');
require('mongoose-type-email');
const bcrypt = require('bcrypt');
const config = require('../config/database');
var db = mongoose.createConnection(config.database);

// Define Wholesaler schema with proper attributes
const WholesalerSchema = mongoose.Schema({
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
    //type: String,
    type: mongoose.SchemaTypes.Email,
    required: true
  },
  phoneNumber: {
    type: String
  }
  /* ADD THIS WHEN COMFORTABLE ADDING RELATIONSHIPS
  properties: {

  },
  investors: {

  }
  */
});

const Wholesaler = module.exports = db.model('Wholesaler', WholesalerSchema);

module.exports.getWholesalerById = function(id, callback) {
  Wholesaler.FindById(id, callback);
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
  //newWholesaler.save(callback);
};
