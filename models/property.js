// Require mongoose package
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('../config/database');
var db = mongoose.createConnection(config.database);

const User = require('./user');

const PropertySchema = mongoose.Schema({
  wholesaler_id: {
    type: String,
    required: true
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
    type: String,
    required: true
  },
  purchasePrice: {
    type: String,
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
  expectedRehab: {
    type: String
  },
  HOA: {
    type: String
  },
  propertyTaxes: {
    type: String
  },
  afterRepairValue: {
    type: String
  },
  capRate: {
    type: String
  },
  averageRent: {
    type: String
  },
  squareFootage: {
    type: String
  },
  propertyType: {
    type: String,
    required: true
  },
  yearBuilt: {
    type: String
  },
  status: {
    type: String
  },
  sellerFinancing: {
    type: String
  },
  utilities: {
    type: String
  },
  insurance: {
    type: String
  },
  comps: [],
  photos: [{
    type: String
  }]
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

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

module.exports.addProperty = (propertyBody) => {
  return new Promise((resolve, reject) => {
    var newProperty = new Property({
      wholesaler_id: propertyBody.wholesaler_id,
      address: propertyBody.address,
      city: propertyBody.city,
      state: propertyBody.state,
      zipCode: propertyBody.zipCode,
      purchasePrice: propertyBody.purchasePrice,
      bedrooms: propertyBody.bedrooms,
      bathrooms: propertyBody.bathrooms,
      expectedRehab: propertyBody.expectedRehab,
      afterRepairValue: propertyBody.afterRepairValue,
      HOA: propertyBody.HOA,
      propertyTaxes: propertyBody.propertyTaxes,
      averageRent: propertyBody.averageRent,
      squareFootage: propertyBody.squareFootage,
      propertyType: propertyBody.propertyType,
      yearBuilt: propertyBody.yearBuilt,
      status: propertyBody.status,
      utilities: propertyBody.utilities,
      insurance: propertyBody.insurance,
      sellerFinancing: propertyBody.sellerFinancing,
      comps: propertyBody.comps,
      photos: propertyBody.photos
    });

    newProperty.save((errorSaving, savedProperty) => {
      if (errorSaving) {
        let errorObj = {
          success: false,
          message: 'Error saving property.',
          error: error
        }
        reject(errorObj);
      } else if (savedProperty) {
        let successObj = {
          success: true,
          message: 'Successfully saved new property.',
          data: savedProperty
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

module.exports.editPropertyByID = (updatedProperty) => {
  return new Promise((resolve, reject) => {
    Property.findById(updatedProperty._id, (err, property) => {
      property.address = updatedProperty.address;
      property.city = updatedProperty.city;
      property.state = updatedProperty.state;
      property.zipCode = updatedProperty.zipCode;
      property.purchasePrice = updatedProperty.purchasePrice;
      property.bedrooms = updatedProperty.bedrooms;
      property.bathrooms= updatedProperty.bathrooms;
      property.expectedRehab = updatedProperty.expectedRehab;
      property.afterRepairValue = updatedProperty.afterRepairValue;
      property.HOA = updatedProperty.HOA;
      property.propertyTaxes = updatedProperty.propertyTaxes;
      property.averageRent = updatedProperty.averageRent;
      property.squareFootage = updatedProperty.squareFootage;
      property.propertyType = updatedProperty.propertyType;
      property.yearBuilt = updatedProperty.yearBuilt;
      property.utilities = updatedProperty.utilities;
      property.insurance = updatedProperty.insurance;
      property.status = updatedProperty.status;
      property.sellerFinancing = updatedProperty.sellerFinancing;
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
};


// get individual property by ID
module.exports.getPropertyByID = (id) => {
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
};


// get multiple properties by ID
module.exports.getPropertiesById = function(propertyIDs) {
  return new Promise((resolve, reject) => {
    if (propertyIDs == []) {
      let returnObj = {
        success: true,
        message: "User does not have any properties.",
        error: ''
      }
      resolve(returnObj);
    } else {
      let properties = [];
      propertyIDs.forEach((id, index) => {
        Property.findById(id, (error, property) => {
          if (error) {
            let errorObj = {
              success: false,
              message: 'Error retrieving properties.',
              error: error
            }
            reject(errorObj);
          } else if (property) {
            properties.push(property);

            if (index == propertyIDs.length-1) {
              let successObj = {
                success: true,
                message: 'Successfully retrieved all properties',
                data: properties
              }
              resolve(successObj);
            }

          } else {
            let errorObj = {
              success: false,
              message: 'Unable to retrieve properties.',
              error: ''
            }
            reject(errorObj);
          }
        });
      });
    }
  });
};


module.exports.updatePropertySoldPending = function(propertyId) {
  return new Promise((resolve, reject) => {
    Property.findById(propertyId, (error, property) => {
      property.status = 'Sold-Pending';
      property.save((error, newProperty) => {
        if (error) {
          let errorObj = {
            success: false,
            message: 'Error updating property.',
            error: error
          }
          reject(errorObj);
        } else if (newProperty) {
          let successObj = {
            success: true,
            message: 'Successfully updated property.',
            data: newProperty
          }
          resolve(successObj);
        } else {
          let errorObj = {
            success: false,
            message: 'Unable to update property',
            error: ''
          }
          reject(errorObj);
        }
      });
    });
  });
};

module.exports.updatePropertySoldAccepted = function(propertyId) {
  return new Promise((resolve, reject) => {
    Property.findById(propertyId, (error, property) => {
      property.status = 'Sold';
      property.save((error, newProperty) => {
        if (error) {
          let errorObj = {
            success: false,
            message: 'Error updating property.',
            error: error
          }
          reject(errorObj);
        } else if (newProperty) {
          let successObj = {
            success: true,
            message: 'Successfully updated property.',
            data: newProperty
          }
          resolve(successObj);
        } else {
          let errorObj = {
            success: false,
            message: 'Unable to update property',
            error: ''
          }
          reject(errorObj);
        }
      });
    });
  });
};

module.exports.deletePropertyById = (id) => {
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