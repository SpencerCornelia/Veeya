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
        success: response.success,
        message: response.message
      });
    }

    Wholesaler.comparePassword(password, response.data.password, (error, isMatchResponse) => {
      if (error) {
        return res.status(500).json({
          success: isMatchResponse.success,
          message: isMatchResponse.message,
          error: isMatchResponse.error
        });
      }

      if (isMatchResponse) {
        const token = jwt.sign(response.data.toJSON(), keys.secret, {
          expiresIn: 604800
        });

        res.status(201).json({
          success: isMatchResponse.success,
          token: 'JWT ' + token,
          user: {
            id: response.data._id,
            firstName: response.data.firstName
          }
        });
      } else {
        return res.status(500).json({
          success: isMatchResponse.success,
          message: isMatchResponse.message
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
        success: response.success,
        message: response.message,
        error: response.error
      });
    }

    Investor.comparePassword(password, response.data.password, (error, isMatchResponse) => {
      if (error) {
        return res.status(500).json({
          success: isMatchResponse.success,
          message: isMatchResponse.message,
          error: isMatchResponse.error
        });
      }

      if (isMatchResponse) {
        const token = jwt.sign(response.data.toJSON(), keys.secret, {
          expiresIn: 604800
        });

        res.status(201).json({
          success: isMatch.success,
          token: 'JWT ' + token,
          user: {
            id: response.data._id,
            firstName: response.data.firstName
          }
        });
      } else {
        return res.status(500).json({
          success: isMatchResponse.success,
          message: isMatchResponse.message,
          error: isMatchResponse.error
        });
      }
    });
  });
});


module.exports = router;