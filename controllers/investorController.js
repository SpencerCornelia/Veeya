const express = require('express');
const router = express.Router();

// Add models
const wholesaler = require('../models/wholesaler');
const investor = require('../models/investor');
const property = require('../models/property');

// GET HTTP to /investor
router.get('/', (req,res) => {
  investor.getAllInvestors((error, response) => {
    if (error) {
      res.status(500).json({
        success: response.success,
        message: response.message,
        error: response.error
      });
    } else {
      res.status(200).json({
        success: response.success,
        message: response.message,
        investors: response.data
      });
    }
  });
});

// POST HTTP to register a new investor
router.post('/register', (req, res) => {
  investor.registerInvestor(req.body, (error, response) => {
    if (error) {
      res.status(500).json({
        success: response.success,
        message: response.message,
        error: response.error
      });
    } else {
      res.status(201).json({
        success: response.success,
        message: response.message,
        investor: response.data
      });
    }
  });
});

// GET HTTP for /investor for a single investor
router.get('/:uid', (req, res) => {
  investor.getInvestorById(req.params.uid, (error, response) => {
    if (error) {
      res.status(500).json({
        success: response.success,
        message: response.message,
        error: response.error
      });
    } else {
      res.status(201).json({
        success: response.success,
        message: response.message,
        investor: response.data
      });
    }
  });
});

// POST HTTP to /investor/inviteinvestor
router.post('/inviteinvestor', (req, res, next) => {
  let wholesalerID = req.body.wholesaler_id;
  let investorEmail = '';
  investor.registerInvestor(req.body)
    .then((investor) => {
      return investor;
    })
    .then((investor) => {
      investorEmail = investor.data.email
      delete investor.data.password;
      return wholesaler.addInvestorConnection(investor.data, wholesalerID);
    })
    .then((wholesaler) => {
      delete wholesaler.data.password;
      return investor.addWholesalerConnection(wholesaler.data, investorEmail);
    })
    .then((response) => {
      if (response.success) {
        res.status(201).json(response);
      } else {
        res.status(500).json(response);
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    })
});


module.exports = router;