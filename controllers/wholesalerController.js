const express = require('express');
const router = express.Router();


// GET HTTP to /wholesaler
router.get('/', (req,res) => {
  res.send("get to /login worked");
});

// POST HTTP to /wholesaler
router.post('/', (req, res, next) => {

});


module.exports = router;