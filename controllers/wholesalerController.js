const express = require('express');
const router = express.Router();

const user = require('../models/user');

// GET HTTP for all wholesalers
router.get('/', (req, res) => {
  user.getAllWholesalers()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(response);
    });
});

// GET HTTP to /wholesaler
router.get('/:uid', (req,res) => {
  user.getWholesalerById(req.params.uid)
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

  user.registerUser(req.body)
    .then((wholesaler) => {
      wholesalerID = wholesaler.data._id;
      delete wholesaler.data.password;
      return user.addWholesalerConnection(wholesaler.data, false, investorID);
    })
    .then((investor) => {
      delete investor.data.password;
      return user.addInvestorConnection(investor.data, wholesalerID);
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
      res.status(500).json(error);
    })
});


module.exports = router;