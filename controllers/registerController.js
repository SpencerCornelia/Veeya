const express = require('express');
const router = express.Router();

// GET HTTP to /register
router.get('/', (req,res) => {
  res.send("get to register worked");
});

// POST HTTP to /register
router.post('/', (req, res, next) => {

});

module.exports = router;