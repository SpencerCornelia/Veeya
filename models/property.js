// Require mongoose package
const mongoose = require('mongoose');

// Define Wholesaler schema with proper attributes
const PropertySchema = mongoose.Schema({
  /* ADD THIS WHEN FIGURING OUT RELATIONSHIPS
  wholesaler: {

  }
  */
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
  comps: [[Number]],
  // someone mentioned online to store photos in a CDN and store URL reference here
  photos: {
    type: String
  }
});

const Property = module.exports = mongoose.model('Property', PropertySchema);