const express = require('express');
const router = express.Router();

const user = require('../models/user');

router.get('/all', (req, res) => {
  user.getAllUsers()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    })
});

router.get('/all/investors', (req, res) => {
  user.getAllInvestors()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get('/all/wholesalers', (req, res) => {
  user.getAllWholesalers()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get('/connections/:uid', (req,res) => {
  let user_id = req.params.uid;
  user.getAllConnections(user_id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    })
});


module.exports = router;