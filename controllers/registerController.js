const express = require('express');
const router = express.Router();

const User = require('../models/user');

// POST HTTP to /register
router.post('/', (req, res, next) => {
  User.registerUser(req.body)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;