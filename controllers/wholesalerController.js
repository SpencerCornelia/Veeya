const express = require('express');
const router = express.Router();

const user = require('../models/user');

// GET HTTP for all wholesalers
router.get('/all', (req, res) => {
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


module.exports = router;