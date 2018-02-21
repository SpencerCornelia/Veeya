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
  var newInvestor = new investor({
    userType: req.body.userType,
    userName: req.body.firstName + req.body.lastName,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    wholesalers: []
  });
  newInvestor.wholesalers[0] = req.body.wholesaler;
  investor.inviteInvestor(newInvestor, (error, response) => {
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