// Require mongoose package
const mongoose = require('mongoose');
require('mongoose-type-email');

// Define Wholesaler schema with proper attributes
const WholesalerSchema = mongoose.Schema({
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
  }
  /* ADD THIS WHEN COMFORTABLE ADDING RELATIONSHIPS
  properties: {

  },
  investors: {

  }
  */
});

const Wholesaler = module.exports = mongoose.model('Wholesaler', WholesalerSchema);