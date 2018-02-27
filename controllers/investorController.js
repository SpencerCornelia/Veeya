const express = require('express');
const router = express.Router();

const user = require('../models/user');
const property = require('../models/property');

// GET HTTP to /investor
router.get('/', (req,res) => {
  user.getAllInvestors()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    })
});

// GET HTTP for /investor for a single investor
router.get('/:uid', (req, res) => {
  user.getInvestorById(req.params.uid)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(response);
    });
});

// POST HTTP to /investor/inviteinvestor
router.post('/inviteinvestor', (req, res, next) => {
  let wholesalerID = req.body.wholesaler_id;
  let investorEmail = '';
  user.registerUser(req.body)
    .then((investor) => {
      return investor;
    })
    .then((investor) => {
      investorEmail = investor.data.email
      delete investor.data.password;
      return user.addInvestorConnection(investor.data, wholesalerID);
    })
    .then((wholesaler) => {
      delete wholesaler.data.password;
      return user.addWholesalerConnection(wholesaler.data, investorEmail);
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