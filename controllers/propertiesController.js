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

// GET HTTP for a property by ID
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
  user.getPropertiesForWholesaler(req.params.uid)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return properties.getPropertiesById(response.data)
    })
    .then((response) => {
      if (response.success) {
        res.status(200).json(response);
      } else {
        res.status(500).json(error);
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// GET HTTP for /properties for an investor. uid = investorID
router.get('/investor/:uid', (req, res) => {
  user.getPropertiesForInvestor(req.params.uid)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return properties.getPropertiesById(response.data);
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

// GET HTTP to /properties/lender/:uid in order to get all properties for lender
router.get('/lender/:uid', (req, res) => {
  user.getPropertiesForLender(req.params.uid)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return properties.getPropertiesById(response.data);
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

// PUT HTTP request to edit a property and UPDATE. ID = wholesalerID
router.put('/editproperty/:id', (req, res, next) => {
  let id = req.params.id;

  property.editPropertyByID(req.body)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// POST HTTP request to mark a property as sold
router.post('/soldproperty', (req, res) => {
  property.updatePropertyAfterSale(req.body.property._id)
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