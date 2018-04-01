const express = require('express');
const router = express.Router();

const Ad = require('../models/ad');
const User = require('../models/user');

router.post('/placeNewAd', (req, res) => {
  Ad.placeNewAd(req.body.newAd)
    .then((response) => {
      return response;
    })
    .then((response) => {
      return User.addDealAd(response.data);
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

router.post('/getDealAdsForInvestor', (req, res) => {
  User.getAdIDs(req.body.userId)
    .then((response) => {
      return response;
    })
    .then((response) => {
      return Ad.getDealAds(response.data);
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