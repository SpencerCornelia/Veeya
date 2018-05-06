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
  let phoneNumber = req.query.phoneNumber;

  user.searchInvestor(email, phoneNumber)
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


module.exports = router;