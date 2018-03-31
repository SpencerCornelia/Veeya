const express = require('express');
const router = express.Router();

const Ad = require('../models/ad');
const User = require('../models/user');

router.post('/placeNewAd', (req, res, next) => {
  Ad.placeNewAd(req.body)
    .then((response) => {
      return response;
    })
    .then((response) => {
      return User.addDealAd(response);
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