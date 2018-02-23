const express = require('express');
const router = express.Router();

// Add Model
const wholesaler = require('../models/wholesaler');
const investor = require('../models/investor');

// GET HTTP for all wholesalers
router.get('/', (req, res) => {

  wholesaler.getAllWholesalers()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(response);
    });
});

// GET HTTP to /wholesaler
router.get('/:uid', (req,res) => {
  wholesaler.getWholesalerById(req.params.uid)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(response);
    });
});

// POST HTTP to invite a wholesaler
router.post('/invitewholesaler', (req, res) => {
  let investorID = req.body.investor_id;
  let wholesalerID = '';
  wholesaler.registerWholesaler(req.body)
    .then((wholesaler) => {
      return wholesaler;
    })
    .then((wholesaler) => {
      wholesalerID = wholesaler.data._id;
      delete wholesaler.data.password;
      return investor.addWholesalerConnection(wholesaler.data, false, investorID);
    })
    .then((investor) => {
      delete investor.data.password;
      return wholesaler.addInvestorConnection(investor.data, wholesalerID);
    })
    .then((response) => {
      if (response.success) {
        delete response.data.password;
        res.status(201).json(response);
      } else {
        res.status(500).json(response);
      }
    })
    .catch((error) => {
      console.log("made it to catch:", error)
      res.status(500).json(error);
    })
});


module.exports = router;