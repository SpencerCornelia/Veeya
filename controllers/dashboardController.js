const express = require('express');
const router = express.Router();
const Data = require('../models/data');

router.get('/:id', (req, res) => {
  Data.getDashboardData(req.params.id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;