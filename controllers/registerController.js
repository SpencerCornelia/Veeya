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
  Wholesaler.registerWholesaler(req.body)
    .then((wholesaler) => {
      res.status(201).json(wholesaler);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// POST HTTP to /register
router.post('/investor', (req, res, next) => {
  Investor.registerInvestor(req.body)
    .then((investor) => {
      res.status(201).json(investor);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;