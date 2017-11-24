const express = require('express');
const router = express.Router();

// Add Model
const wholesaler = require('../models/wholesaler');
const investor = require('../models/investor');

// GET HTTP to /wholesaler
router.get('/:uid', (req,res) => {
  wholesaler.getWholesalerById(req.params.uid, (err, w) => {
    if (err) {
      res.json({
        success: false,
        message: "Failed to find a wholesaler.",
        error: err
      });
    } else {
      res.json({
        success: true,
        message: "Found wholesaler by id.",
        wholesaler: w,
        id: wholesaler._id
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
  wholesaler.addInvestorToWholesaler(newInvestor, req.params.uid, (err, investor) => {
    if (err) {
      res.json({
        success: false,
        message: "Failed to add a new investor to wholesaler.",
        error: err
      });
    } else {
      res.json({
        success: true,
        message: "Added investor successfully to wholesaler.",
        investor: investor
      });
    }
  });
});


module.exports = router;