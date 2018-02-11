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

module.exports.editProperty = (property, callback) => {
  // Property.findById(property.id, )
}

module.exports.getPropertyByID = (id, callback) => {
  Property.findById(id, (err, property) => {
    if (err) {
      console.log("error finding property by id in model");
    } else {
      callback(property);
    }
  });
}

// We need to pass an id parameter to Property.remove
module.exports.deletePropertyById = (id, callback) => {
  let query = {_id: id};
  Property.remove(query, callback);
}