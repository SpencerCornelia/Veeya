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
        wholesaler: response.data
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

// POST HTTP to invite a wholesaler
router.post('/invitewholesaler', (req, res) => {
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

// POST HTTP to add investor to investors array
router.post('/addInvestorConnection', (req, res) => {
  delete req.body.password;
  wholesaler.addInvestorConnection(req.body, req.body.wholesaler_id, (error, response) => {
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