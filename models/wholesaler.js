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

module.exports.getWholesalerByEmail = function(email, callback) {
  Wholesaler.findOne({ 'email': email }, (err, user) => {
    if (err) {
      callback(true, {
        success: false,
        message: "Error finding wholesaler."
      });
    } else {
      callback(false, {
        success: true,
        message: "Successfully found wholesaler.",
        wholesaler: user
      });
    }
  });
};

module.exports.registerWholesaler = function(wholesaler, callback) {
  Wholesaler.findOne({ 'email': wholesaler.email }, (err, user) => {
    if (err) {
      callback(true, {
        success: false,
        message: "Error registering wholesaler."
      });
    }

    if (user) {
      callback(true, {
        success: false,
        message: "Wholesaler already exists."
      });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(wholesaler.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }

          let newWholesaler = new Wholesaler({
            userType: "Wholesaler",
            userName: wholesaler.userName,
            password: hash,
            firstName: wholesaler.firstName,
            lastName: wholesaler.lastName,
            email: wholesaler.email,
            phoneNumber: wholesaler.phoneNumber
          });

          console.log("newWholesaler:", newWholesaler)
          newWholesaler.save((err) => {
            if (err) {
              callback(true, {
                success: false,
                message: "Error registering wholesaler."
              });
            } else {
              callback(false, {
                success: true,
                message: "Successfully registered wholesaler."
              });
            }
          });
        });
      });
    }
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
  let index = 0;
  Wholesaler.findOne({_id: property.wholesaler}, (err, wholesaler) => {
    if (err) {
      console.log("error finding wholesaler:", err);
    } else {
      var prop = wholesaler.properties.forEach((p, i) => {
        if(p._id == property._id) {
          index = i;
        }
      });
      wholesaler.properties[index] = property;
      wholesaler.markModified('properties');
      wholesaler.save(function(err) {
        if (err) {
          console.log("error updating property for wholesaler:", err);
          return;
        }
        callback(property);
      });
    }
  });
};

module.exports.getAllWholesalers = function(callback) {
  Wholesaler.find().exec((err, wholesalers) => {
    if (err) {
      callback(true, {
        success: false,
        message: "Error finding all wholesalers."
      })
    } else {
      callback(false, {
        success: true,
        message: "Successfully retrieved all wholesalers.",
        data: wholesalers
      });
    }
  });
};

module.exports.comparePassword = function(attemptedPassword, wholesalerPassword, callback) {
  bcrypt.compare(attemptedPassword, wholesalerPassword, (error, isMatch) => {
    if (error) {
      callback(true);
    } else {
      callback(false, isMatch);
    }
  });
};

