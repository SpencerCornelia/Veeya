const express = require('express');
const router = express.Router();

const property = require('../models/property');
const user = require('../models/user');

// GET HTTP to /properties
// use this for testing to see all properties
router.get('/', (req,res) => {
  property.getAllProperties()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get('/property/:uid', (req, res) => {
  property.getPropertyByID(req.params.uid)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// GET HTTP for /properties for a wholesaler. uid = wholesalerID
router.get('/wholesaler/:uid', (req, res) => {
  user.getPropertiesForUser(req.params.uid)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// GET HTTP for /properties for an investor. uid = investorID
router.get('/investor/:uid', (req, res) => {
  user.getPropertiesForUser(req.params.uid)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    })
});

// POST HTTP to /properties/addproperty
router.post('/addproperty', (req, res, next) => {
  property.addProperty(req.body)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// GET HTTP to /properties/id to see a specific property
router.get('/editproperty/:id', (req, res, next) => {
  let id = req.params.id;

  property.getPropertyByID(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// PUT HTTP request to edit a property and UPDATE. ID = wholesalerID
router.put('/editproperty/:id', (req, res, next) => {
  let id = req.params.id;

  user.updatePropertyForWholesaler(req.body)
    .then((response) => {
      return property.editPropertyByID(req.body)
    })
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });

});

// DELETE HTTP request for deleting a property
router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  property.deletePropertyById(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;