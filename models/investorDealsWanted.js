// Require mongoose package
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('../config/database');
var db = mongoose.createConnection(config.database);

const User = require('./user');

const InvestorDealsWantedSchema = mongoose.Schema({
  investor: {
    type: Object
  },
  purchasePrice: {
    type: String
  },
  capRate: {
    type: String
  },
  netOperatingIncome: {
    type: String
  },
  propertyType: {
    type: String
  }
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const InvestorDealsWanted = module.exports = db.model('InvestorDealsWanted', InvestorDealsWantedSchema);

