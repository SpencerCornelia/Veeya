// Require mongoose package
const mongoose = require('mongoose');
require('mongoose-type-email');

// Define Wholesaler schema with proper attributes
const InvestorSchema = mongoose.Schema({
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
});

const Investor = module.exports = mongoose.model('Investor', InvestorSchema);