// Require mongoose package
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('../config/database');
var db = mongoose.createConnection(config.database);

const Wholesaler = require('./wholesaler');

// Define Property schema with proper attributes
const PropertySchema = mongoose.Schema({
  wholesaler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wholesaler'
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: Number,
    required: true
  },
  purchasePrice: {
    type: Number,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  rehabCostMin: {
    type: Number
  },
  rehabCostMax: {
    type: Number
  },
  afterRepairValue: {
    type: Number
  },
  averageRent: {
    type: Number
  },
  squareFootage: {
    type: Number
  },
  propertyType: {
    type: String,
    required: true
  },
  yearBuilt: {
    type: Number
  },
  status: {
    type: String
  },
  comps: [{
    type: Number
  }],
  // someone mentioned online to store photos in a CDN and store URL reference here
  // something like Cloudinary looks like it'll work
  photos: [{
    type: String
  }]
});

const Property = module.exports = db.model('Property', PropertySchema);

// Property.find() returns all of the properties
module.exports.getAllProperties = (callback) => {
  Property.find(callback);
}

// newProperty.save() is used to insert the document into MongoDB
module.exports.addProperty = (newProperty, wholesalerID, callback) => {
  const wholesaler = Wholesaler.findOneAndUpdate(
    {_id: wholesalerID},
    {$push: {properties: newProperty}},
    {safe: true, upsert: true},
    function(err, success) {
      if (err) { console.log("error on updating wholesaler in addProperty"); }
    }
  );
  newProperty.save(callback);
}

module.exports.editPropertyByID = (updatedProperty, callback) => {
  Property.findById(updatedProperty._id, (err, property) => {
    property.address = updatedProperty.address;
    property.city = updatedProperty.city;
    property.state = updatedProperty.state;
    property.zipCode = updatedProperty.zipCode;
    property.purchasePrice = updatedProperty.purchasePrice;
    property.bedrooms = updatedProperty.bedrooms;
    property.bathrooms= updatedProperty.bathrooms;
    property.rehabCostMin = updatedProperty.rehabCostMin;
    property.rehabCostMax = updatedProperty.rehabCostMax;
    property.afterRepairValue = updatedProperty.afterRepairValue;
    property.averageRent = updatedProperty.averageRent;
    property.squareFootage = updatedProperty.squareFootage;
    property.propertyType = updatedProperty.propertyType;
    property.yearBuilt = updatedProperty.yearBuilt;
    property.status = updatedProperty.status;
    property.comps = updatedProperty.comps;

    property.save((err, property) => {
      if (err) {
        console.log("error with saving updated property");
      } else {
        callback(property);
      }
    });
  });
}

module.exports.getPropertyByID = (id, callback) => {
  Property.findById(id, (err, property) => {
    if (err) {
      callback(err);
    } else {
      callback(false, property);
    }
  });
}

module.exports.deletePropertyById = (id, callback) => {
  let query = {_id: id};
  Property.remove(query, callback);
}