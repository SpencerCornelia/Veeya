// Require mongoose package
const mongoose = require('mongoose');
require('mongoose-type-email');
const config = require('../config/database');
var db = mongoose.createConnection(config.database);

// Define Wholesaler schema with proper attributes
const InvestorSchema = mongoose.Schema({
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
  wholesalers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wholesaler'
  }],
  properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }]
});

const Investor = module.exports = db.model('Investor', InvestorSchema);