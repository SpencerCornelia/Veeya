const express = require('express');
const router = express.Router();

const user = require('../models/user');

// GET HTTP to /lender

router.get('/all', (req, res) => {
  user.getAllLenders()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});


module.exports = router;