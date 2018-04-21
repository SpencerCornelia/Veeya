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
  }],
  auctionEstablished: {
    type: String,
    default: 'false'
  }
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
  let validate = validatePropertyInputs(propertyBody);
  if (validate) {
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
        photos: propertyBody.photos,
        auctionEstablished: 'false'
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
  } else {
    return new Promise((resolve, reject) => {
      let errorObj = {
        success: true,
        message: 'Invalid inputs. Please enter valid inputs.'
      }
      reject(errorObj);
    });
  }
}

module.exports.editPropertyByID = (updatedProperty) => {
  let validate = validatePropertyInputs(updatedProperty);
  if (validate) {
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
  } else {
    return new Promise((resolve, reject) => {
      let errorObj = {
        success: true,
        message: 'Invalid inputs. Please enter valid inputs.'
      }
      reject(errorObj);
    });
  }
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

module.exports.updatePropertyDenySold = function(propertyId) {
  return new Promise((resolve, reject) => {
    Property.findById(propertyId, (error, property) => {
      property.status = 'Listed';
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
    let query = { '_id': id };
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
};

module.exports.establishAuction = (id) => {
  return new Promise((resolve, reject) => {
    Property.findById(id, (error, property) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error starting auction.',
          error: error
        }
        reject(errorObj);
      } else if (property) {
        property.auctionEstablished = 'true';
        property.save((error, newProperty) => {
          if (error) {
            let errorObj = {
              success: false,
              message: 'Error starting auction.',
              error: error
            }
            reject(errorObj);
          } else if (newProperty) {
            let successObj = {
              success: true,
              message: 'Successfully started new auction.',
              data: newProperty
            }
            resolve(successObj);
          } else {
            let errorObj = {
              success: false,
              message: 'Unable to start auction.',
              error: ''
            }
            reject(errorObj);
          }
        });
      }
    });
  });
};


let validatePropertyInputs = function(data) {
 let addressPattern = /^[a-zA-Z0-9,.!? ]*$/
 let addressMatch = data.address.match(addressPattern) && data.address.length >= 5 && data.address.length <= 50;

 let cityPattern = /^[a-zA-Z ]*$/;
 let cityMatch = data.city.match(cityPattern) && data.city.length >= 3 && data.city.length <= 30;
 let stateMatch = data.state.length == 2;

 let zipCodePattern = /^[0-9]*$/;
 let zipCodeMatch = data.zipCode.match(zipCodePattern) && data.zipCode.length >= 5 && data.zipCode.length <= 10;

 let purchasePricePattern = /^[0-9]*$/;
 let purchasePriceMatch = data.purchasePrice.match(purchasePricePattern) && data.purchasePrice.length >= 5 && data.purchasePrice.length <= 10;

 let expectedRehabPattern = /^[0-9]*$/;
 let expectedRehabMatch = false;
 if (data.expectedRehab) {
  expectedRehabMatch = data.expectedRehab.match(expectedRehabPattern) && data.expectedRehab.length <= 10;
 } else {
  expectedRehabMatch = true;
 }

 let afterRepairValuePattern = /^[0-9]*$/;
 let afterRepairValueMatch = false;
 if (data.afterRepairValue) {
  afterRepairValueMatch = data.afterRepairValue.match(afterRepairValuePattern) && data.afterRepairValue.length >= 5 && data.afterRepairValue.length <= 10;
 } else {
  afterRepairValueMatch = true;
 }

 let averageRentPattern = /^[0-9]*$/;
 let averageRentMatch = false;
 if (data.averageRent) {
  averageRentMatch = data.averageRent.match(averageRentPattern) && data.averageRent.length >= 3 && data.averageRent.length <= 6;
 } else {
  averageRentMatch = true;
 }

 let squareFootagePattern = /^[0-9]*$/;
 let squareFootageMatch = false;
 if (data.squareFootage) {
  squareFootageMatch = data.squareFootage.match(squareFootagePattern) && data.squareFootage.length >= 3 && data.squareFootage.length <= 6;
 } else {
  squareFootageMatch = true;
 }

 let propertyTypeMatch = false;
 if (data.propertyType == 'Single Family' || data.propertyType == 'Condo' || data.propertyType == 'Duplex' || data.propertyType == 'Triplex'
  || data.propertyType == 'Quadplex' || data.propertyType == 'Five-plus' || data.propertyType == 'Apartments') {
  propertyTypeMatch = true;
 } else {
  propertyTypeMatch = false;
 }

 let yearBuiltPattern = /^[0-9]*$/;
 let yearBuiltMatch = false;
 if (data.yearBuilt) {
  yearBuiltMatch = data.yearBuilt.match(yearBuiltPattern) && data.yearBuilt.length == 4;
 } else {
  yearBuiltMatch = true;
 }

 let capRatePattern = /[^-?\$?[0-9]*\.?([0-9]{2})?%]/;
 let capRateMatch = false;
 if (data.capRate) {
  capRateMatch = data.capRate.match(capRatePattern) && data.capRate.length <= 4;
 } else {
  capRateMatch = true;
 }

 let hoaPattern = /^[0-9]*$/;
 let hoaMatch = false;
 if (data.HOA) {
  hoaMatch = data.HOA.match(hoaPattern) && data.HOA.length <= 6;
 } else {
  hoaMatch = true;
 }

 let propertyTaxesPattern = /^[0-9*$]/;
 let propertyTaxesMatch = false;
 if (data.propertyTaxes) {
  propertyTaxesMatch = data.propertyTaxes.match(propertyTaxesPattern) && data.propertyTaxes.length <= 6;
 } else {
  propertyTaxesMatch = true;
 }

 let utilitiesPattern = /^[0-9]*$/;
 let utilitiesMatch = false;
 if (data.utilities) {
  utilitiesMatch = data.utilities.match(utilitiesPattern) && data.utilities.length <= 6;
 } else {
  utilitiesMatch = true;
 }

 let insurancePattern = /^[0-9]*$/;
 let insuranceMatch = false;
 if (data.insurance) {
  insuranceMatch = data.insurance.match(insurancePattern) && data.insurance.length <= 6;
 } else {
  insuranceMatch = true;
 }

 let firstCompAddressPattern = /^[a-zA-Z0-9,.!? ]*$/;
 let firstCompAddressMatch = false;
 if (data.firstCompAddress) {
  firstCompAddressMatch = data.firstCompAddress.match(firstCompAddressPattern) && data.firstCompAddress.length <= 50;
 } else {
  firstCompAddressMatch = true;
 }

 let firstCompPricePattern = /^[a-zA-Z0-9,.!? ]*$/;
 let firstCompPriceMatch = false;
 if (data.firstCompPrice) {
  firstCompPriceMatch = data.firstCompPrice.match(firstCompPricePattern) && data.firstCompPrice.length <= 10;
 } else {
  firstCompPriceMatch = true;
 }

 let secondCompAddressPattern = /^[a-zA-Z0-9,.!? ]*$/;
 let secondCompAddressMatch = false;
 if (data.secondCompAddress) {
  secondCompAddressMatch = data.secondCompAddress.match(secondCompAddressPattern) && data.secondCompAddress.length <= 50;
 } else {
  secondCompAddressMatch = true;
 }

 let secondCompPricePattern = /^[a-zA-Z0-9,.!? ]*$/;
 let secondCompPriceMatch = false;
 if (data.secondCompPrice) {
  secondCompPriceMatch = data.secondCompPrice.match(secondCompPricePattern) && data.secondCompPrice.length <= 10;
 } else {
  secondCompPriceMatch = true;
 }

 let thirdCompAddressPattern = /^[a-zA-Z0-9,.!? ]*$/;
 let thirdCompAddressMatch = false;
 if (data.thirdCompAddress) {
  thirdCompAddressMatch = data.thirdCompAddress.match(thirdCompAddressPattern) && data.thirdCompAddress.length <= 50;
 } else {
  thirdCompAddressMatch = true;
 }

 let thirdCompPricePattern = /^[a-zA-Z0-9,.!? ]*$/;
 let thirdCompPriceMatch = false;
 if (data.thirdCompPrice) {
  thirdCompPriceMatch = data.thirdCompPrice.match(thirdCompPricePattern) && data.thirdCompPrice.length <= 10;
 } else {
  thirdCompPriceMatch = true;
 }

 if (addressMatch && cityMatch && stateMatch && zipCodeMatch && purchasePriceMatch && expectedRehabMatch && afterRepairValueMatch && averageRentMatch && squareFootageMatch && propertyTypeMatch && yearBuiltMatch && capRateMatch && hoaMatch && propertyTaxesMatch && utilitiesMatch && insuranceMatch && firstCompAddressMatch && firstCompPriceMatch && secondCompAddressMatch && secondCompPriceMatch && thirdCompAddressMatch && thirdCompPriceMatch) {
  return true;
 } else {
  return false;
 }

};



