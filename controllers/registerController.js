const express = require('express');
const router = express.Router();

const Wholesaler = require('../models/wholesaler');
const Investor = require('../models/investor');

// GET HTTP to /register
router.get('/', (req,res) => {
  res.send("get to register worked");
});

// POST HTTP to /register
router.post('/wholesaler', (req, res, next) => {
  let newWholesaler = new Wholesaler({
    userType: "Wholesaler",
    userName: req.body.userName,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber
  });

  Wholesaler.registerWholesaler(newWholesaler, (error, response) => {
    if (error) {
      res.status(500).json({
        success: false,
        message: response.message
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Wholesaler registered.",
        wholesaler: response.wholesaler
      });
    }
  });
});

// POST HTTP to /register
router.post('/investor', (req, res, next) => {
  let newInvestor = new Investor({
    userType: "Investor",
    userName: req.body.userName,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber
  });

  Investor.registerInvestor(newInvestor, (error, response) => {
    if (error) {
      res.status(500).json({
        success: false,
        message: response.message
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Successfully registered investor."
      });
    }
  });
});

module.exports = router;