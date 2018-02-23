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
  return new Promise((resolve, reject) => {
    Property.find((error, properties) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error retrieving properties.',
          error: error
        }
        reject(errorObj);
      } else if (properties) {
        let successObj = {
          success: true,
          message: 'Successfully retrieved all properties.',
          data: properties
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to find properties.',
          error: ''
        }
        reject(errorObj);
      }
    });
  })
}

// newProperty.save() is used to insert the document into MongoDB
module.exports.addProperty = (newProperty, wholesalerID, callback) => {
  return new Promise((resolve, reject) => {
    Wholesaler.findOneAndUpdate(
      { _id: wholesalerID },
      { $push: { properties: newProperty }},
      { safe: true, upsert: true, new: true },
      function(error, success) {
        if (error) {
          let errorObj = {
            success: false,
            message: 'Error adding property.',
            error: error
          }
          reject(errorObj);
        }
      }
    );
    newProperty.save((error, property) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error saving property to wholesaler.',
          error: error
        }
        reject(errorObj);
      } else if (property) {
        let successObj = {
          success: true,
          message: 'Successfully saved new property.',
          data: property
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to save new property.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
}

module.exports.editPropertyByID = (updatedProperty, callback) => {
  return new Promise((resolve, reject) => {
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

      property.save((error, property) => {
        if (error) {
          let errorObj = {
            success: false,
            message: 'Error updating property.',
            error: error
          }
          reject(errorObj);
        } else if (property) {
          let successObj = {
            success: true,
            message: 'Successfully edited property.',
            data: property
          }
          resolve(successObj);
        } else {
          let errorObj = {
            success: false,
            message: 'Unable to save property.',
            error: ''
          }
          reject(errorObj);
        }
      });
    });
  });
}

module.exports.getPropertyByID = (id, callback) => {
  return new Promise((resolve, reject) => {
    Property.findById(id, (error, property) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error retrieving property.',
          error: error
        }
        reject(errorObj);
      } else if (property) {
        let successObj = {
          success: true,
          message: 'Successfully retrieved property.',
          data: property
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to retrieve property.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
}

module.exports.deletePropertyById = (id, callback) => {
  return new Promise((resolve, reject) => {
    let query = {_id: id};
    Property.remove(query, (error, success) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error deleting property.',
          error: error
        }
        reject(errorObj);
      } else if (success) {
        let successObj = {
          success: true,
          message: 'Successfully deleted property.'
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to delete property',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
}