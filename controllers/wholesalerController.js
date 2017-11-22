const express = require('express');
const router = express.Router();

// Add Model
const wholesaler = require('../models/wholesaler');

// GET HTTP to /wholesaler
router.get('/:uid', (req,res) => {
  wholesaler.getWholesalerById(req.params.uid, (err, w) => {
    if (err) {
      res.json({
        success: false,
        message: "Failed to find a wholesaler. Error: " + err
      });
    } else {
      res.json({
        success: true,
        message: "Found wholesaler by id. Wholesaler = " + w,
        id: wholesaler._id
      });
    }
  });
});

// POST HTTP to /wholesaler
router.post('/', (req, res, next) => {

});


module.exports = router;