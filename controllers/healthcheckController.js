const express = require('express');
const router = express.Router();


// GET HTTP to /login
router.get('/', (req,res) => {
  res.send("passed");
});

// POST HTTP to /login
router.post('/', (req, res, next) => {

});


module.exports = router;
