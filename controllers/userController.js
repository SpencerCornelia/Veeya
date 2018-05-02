const express = require('express');
const router = express.Router();

const user = require('../models/user');

// HTTP requests to /user

router.get('/:id', (req, res) => {
  user.getUserById(req.params.id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.put('/updateProfileInfo/:id', (req, res) => {
  user.updateUserMyProfileInfo(req.body)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.put('/updatePassword/:id', (req, res) => {
  user.updatePassword(req.body)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.put('/updateProfilePhoto/:id', (req, res) => {
  user.updateProfilePhoto(req.params.id, req.body.photoURL)
    .then((response) => {
      res.status(201).json(response)
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get('/all/users', (req, res) => {
  user.getAllUsers()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
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

router.post('/inviteuser', (req, res) => {
  let currentUserId = req.body.currentUserId;
  let newUserId = '';
  user.registerInvitedUser(req.body)
    .then((registeredUser) => {
      newUserId = String(registeredUser.data._id);
      delete registeredUser.data.password;
      return user.addNewUserConnection(currentUserId, newUserId);
    })
    .then((response) => {
      if (response.success) {
        res.status(201).json(response);
      } else {
        res.status(500).json(response);
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    })
});

router.get('/connections/:uid', (req, res) => {
  let user_id = req.params.uid;
  user.getAllConnections(user_id)
    .then((response) => {
      let idArray = response.data;
      return user.getAllConnectionsByIDs(idArray);
    })
    .then((response) => {
      if (response.success) {
        res.status(200).json(response);
      } else {
        res.status(500).json(response);
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    })
});

router.get('/pendingconnections/:id', (req, res) => {
  let userId = req.params.id;
  user.getPendingConnections(userId)
    .then((response) => {
      let idArray = response.data;
      if (idArray.length == 0) {
        return res.status(200).json(response);
      } else {
        return user.getAllConnectionsByIDs(idArray);
      }
    })
    .then((response) => {
      if (response.success) {
        res.status(200).json(response);
      } else {
        res.status(500).json(response);
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post('/addconnection', (req, res) => {
  user.addOutgoingConnectionRequest(req.body.currentUserId, req.body.connectionUserId)
    .then((response) => {
      return user.addIncomingConnectionRequest(req.body.currentUserId, req.body.connectionUserId);
    })
    .then((response) => {
      if (response.success) {
        res.status(201).json(response);
      } else {
        res.status(500).json(response);
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    })
});

router.post('/acceptconnection', (req, res) => {
  let responseObj = {
    success: true,
    message: 'Success',
    data: {
      currentUser: {},
      connectionUser: {}
    }
  }

  user.acceptConnectionCurrentUser(req.body)
    .then((response) => {
      responseObj.data.currentUser = response.data;
      return user.acceptConnectionConnectedUser(req.body)
    })
    .then((response) => {
      if (response.success) {
        responseObj.data.connectionUser = response.data;
        res.status(201).json(responseObj);
      } else {
        res.status(500).json(response);
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post('/denyconnection', (req, res) => {
  let responseObj = {
    success: true,
    message: 'Successfully denied connection request.',
    data: {
      currentUser: {},
      connectionUser: {}
    }
  }

  user.denyConnectionCurrentUser(req.body)
    .then((response) => {
      responseObj.data.currentUser = response.data;
      return user.denyConnectionConnectedUser(req.body)
    })
    .then((response) => {
      if (response.success) {
        responseObj.data.connectionUser = response.data;
        res.status(201).json(responseObj);
      } else {
        res.status(500).json(response);
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.put('/increaseViews', (req, res) => {
  let userId = req.body.id;

  user.increaseViewCount(userId)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post('/uploadList', (req, res) => {
  let list = req.body.list;
  let userId = req.body.connectionId;
  user.addUsersFromUpload(list)
    .then((response) => {
      if (response.data.length == 0) {
        return res.status(201).json(response);
      } else {
        return response;
      }
    })
    .then((response) => {
      if (response.data.length == 0) {
        return res.status(201).json(response);
      } else {
        let connectionIDs = response.data;
        return user.addConnections(connectionIDs, userId);
      }
    })
    .then((response) => {
      if (response.success) {
        res.status(201).json(response);
      } else {
        res.status(500).json(response);
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.delete('/deleteuser/:id', (req, res) => {
  let id = req.params.id;
  user.deleteUser(id)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});


module.exports = router;