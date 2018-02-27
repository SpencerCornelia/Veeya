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
  var newProperty = new property({
    wholesaler: req.body.wholesaler,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    purchasePrice: req.body.purchasePrice,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    rehabCostMin: req.body.rehabCostMin,
    rehabCostMax: req.body.rehabCostMax,
    afterRepairValue: req.body.afterRepairValue,
    averageRent: req.body.averageRent,
    squareFootage: req.body.squareFootage,
    propertyType: req.body.propertyType,
    yearBuilt: req.body.yearBuilt,
    status: req.body.status,
    comps: req.body.comps,
    photos: "to be added later"
    // need to figure out how to store photos in a CDN and then link that URL to photos array
    //photos: req.body.photos
  });
  property.addProperty(newProperty, req.body.wholesaler)
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