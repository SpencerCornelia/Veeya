const express = require('express');
const router = express.Router();

const user = require('../models/user');
const property = require('../models/property');


// GET HTTP to /investor
router.get('/all', function(req,res) {
  user.getAllInvestors()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    })
});

router.get('/searchInvestor', (req, res) => {
  let email = req.query.email;
  let userName = req.query.username;
  let phoneNumber = req.query.phoneNumber;

  user.searchInvestor(email, userName, phoneNumber)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      re.status(500).json(error);
    });
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
  let investorId = '';
  user.registerUser(req.body)
    .then((investor) => {
      investorId = String(investor.data._id);
      investorEmail = investor.data.email
      delete investor.data.password;
      return user.addInvestorConnection(investorId, wholesalerID);
    })
    .then((wholesaler) => {
      delete wholesaler.data.password;
      return user.addWholesalerConnection(wholesalerID, investorId);
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