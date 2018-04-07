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
  let userId = req.body.invitee_id;
  let lenderId = '';

  user.registerInvitedUser(req.body)
    .then((lender) => {
      lenderId = String(lender.data._id);
      return user.addLenderConnection(lenderId, userId);
    })
    .then((updatedUser) => {
      return user.addUserConnectionForLender(userId, lenderId);
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