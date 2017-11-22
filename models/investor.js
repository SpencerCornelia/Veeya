// Require mongoose package
const mongoose = require('mongoose');
require('mongoose-type-email');
const config = require('../config/database');
var db = mongoose.createConnection(config.database);

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

const Investor = module.exports = db.model('Investor', InvestorSchema);