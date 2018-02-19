const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Wholesaler = require('../models/wholesaler.js');
const Investor = require('../models/investor.js');

const keys = require('../config/keys.js');

// POST HTTP to /login for wholesaler
router.post('/wholesaler', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Wholesaler.getWholesalerByEmail(email, (error, response) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "Wholesaler with those credentials not found."
      });
    }

    Wholesaler.comparePassword(password, response.wholesaler.password, (error, isMatch) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Error logging wholesaler into application."
        });
      }

      if (isMatch) {
        const token = jwt.sign(response.wholesaler.toJSON(), keys.secret, {
          expiresIn: 604800
        });

        res.status(201).json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: response.wholesaler._id,
            firstName: response.wholesaler.firstName
          }
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Combination of email and password incorrect for wholesaler user type."
        });
      }
    });
  });
});

// POST HTTP login to investor
router.post('/investor', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Investor.getInvestorByEmail(email, (error, response) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "Investor with those credentials not found."
      });
    }

    Investor.comparePassword(password, response.investor.password, (error, isMatch) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Error logging investor into application."
        });
      }

      if (isMatch) {
        const token = jwt.sign(response.investor.toJSON(), keys.secret, {
          expiresIn: 604800
        });

        res.status(201).json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: response.investor._id,
            firstName: response.investor.firstName
          }
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Combination of email and password incorrect for investor user type."
        });
      }
    });
  });
});


module.exports = router;