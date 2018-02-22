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
  let wholesaler_id = req.body.wholesaler_id;
  wholesaler.getWholesalerById(req.body.wholesaler_id, (error, response) => {
    if (error) {
      res.status(500).json({
        success: response.success,
        message: response.message,
        error: response.error
      });
    }

    let newInvestor = {
      userType: req.body.userType,
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber
    }
    investor.registerInvestor(newInvestor, (error, registerResponse) => {
      if (error) {
        res.status(500).json({
          success: registerResponse.success,
          message: registerResponse.message,
          error: registerResponse.error
        });
      }

      delete registerResponse.data.password;

      wholesaler.updateInvestorsList(wholesaler_id, registerResponse.data, (error, updateWholesalerResponse) => {
        if (error) {
          res.status(500).json({
            success: updateWholesalerResponse.success,
            message: updateWholesalerResponse.message,
            error: updateWholesalerResponse.error
          });
        }
      });

      investor.updateWholesalersList(registerResponse._id, response.data, (error, updateInvestorResponse) => {
        if (error) {
          res.status(500).json({
            success: updateInvestorResponse.success,
            message: updateInvestorResponse.message,
            error: updateInvestorResponse.error
          });
        } else {
          res.status(201).json({
            success: true,
            message: 'Successfully invited investor.'
          });
        }
      });
    });
  });
});

// GET HTTP for sold properties
router.get('/sold', (req, res, next) => {
  res.send("GET for sold properties")
});

// DELETE HTTP request for deleting a property
router.delete('/:id', (req, res, next) => {
  let id = req.params.id;

  property.deletePropertyById(id, (error, response) => {
    if (error) {
      res.status(500).json({
        success: response.success,
        message: response.message,
        error: response.error
      });
    } else {
      res.status(201).json({
        success: response.success,
        message: response.message
      });
    }
  });
});

module.exports = router;