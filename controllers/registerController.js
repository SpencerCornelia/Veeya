const express = require('express');
const router = express.Router();

const Wholesaler = require('../models/wholesaler');

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

  Wholesaler.addWholesaler(newWholesaler, (err, w) => {
    if (err) {
      res.json({
        success: false,
        message: "Failed to register a new wholesaler"
      })
    } else {
      res.json({
        success: true,
        message: "Wholesaler registered.",
        wholesaler: w
      });
    }
  });
});

module.exports = router;