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

router.post('/invitelender', (req,res) => {
  let inviteeId = req.body.invitee_id;
  let lenderID = '';

  user.registerUser(req.body)
    .then((lender) => {
      lenderID = lender.data._id;
      delete lender.data.password;
      return user.addLenderConnection(lender.data, inviteeId);
    })
    .then((updatedUser) => {
      delete updatedUser.data.password;
      return user.addUserConnectionForLender(updatedUser.data, lenderID);
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