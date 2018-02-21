const express = require('express');
const router = express.Router();

// Add Model
const wholesaler = require('../models/wholesaler');
const investor = require('../models/investor');

// GET HTTP for all wholesalers
router.get('/', (req, res) => {
  wholesaler.getAllWholesalers((error, response) => {
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
        wholesalers: response.data
      });
    }
  });
});

// GET HTTP to /wholesaler
router.get('/:uid', (req,res) => {
  wholesaler.getWholesalerById(req.params.uid, (error, response) => {
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
        wholesaler: response.data,
        id: req.params.uid
      });
    }
  });
});

// POST HTTP to /wholesaler/wholesalerId/addInvestor
router.post('/:uid/addInvestor', (req, res, next) => {
  var newInvestor = new investor({
    userType: req.body.userType,
    userName: req.body.userName,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber
  });
  wholesaler.addInvestorToWholesaler(newInvestor, req.params.uid, (error, response) => {
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

// POST HTTP to register a new wholesaler
router.post('/register', (req, res) => {
  wholesaler.registerWholesaler(req.body, (error, response) => {
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
        wholesaler: response.data
      });
    }
  });
});


module.exports = router;