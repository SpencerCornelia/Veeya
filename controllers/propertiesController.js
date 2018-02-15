const express = require('express');
const router = express.Router();

// Add models
const wholesaler = require('../models/wholesaler');
const investor = require('../models/investor');
const property = require('../models/property');

// GET HTTP to /properties
// use this for testing to see all properties
router.get('/', (req,res) => {
  property.getAllProperties((err, properties) => {
    if (err) {
      res.json({
        success: false,
        message: "Failed to load all lists. Error: " + err
      });
    } else {
      res.write(JSON.stringify({
        success: true,
        properties: properties
      }, null, 2));
      res.end();
    }
  });
});

router.get('/property/:uid', (req, res) => {
  property.getPropertyByID(req.params.uid, (err, property) => {
    if (err) {
      res.json({
        success: false,
        message: "Error getting property:", err
      });
    } else {
      res.json({
        success: true,
        message: "Get property successful.",
        property: property
      });
    }
  });
});

// GET HTTP for /properties for a wholesaler. uid = wholesalerID
router.get('/:uid', (req, res) => {
  wholesaler.getPropertiesForWholesaler(req.params.uid, (err, w) => {
    if (err) {
      res.json({
        success: false,
        message: "Failed to find a wholesaler. Error: " + err
      });
    } else {
      res.json({
        success: true,
        message: "Found wholesaler by id.",
        // wholesaler: w,
        properties: w.properties
      });
    }
  });
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
  property.addProperty(newProperty, req.body.wholesaler, (err, prop) => {
    if (err) {
      res.json({
        success: false,
        message: "Failed to create a new property.",
        error: err
      });
    } else {
      res.json({
        success: true,
        message: "Added property successfully.",
        property: prop
      });
    }
  });
});

// GET HTTP to /properties/id to see a specific property
router.get('/editproperty/:id', (req, res, next) => {
  let id = req.params.id;

  property.getPropertyByID(id, (err, property) => {
    if (err) {
      res.json({
        success: false,
        message: "Error getting property by wholesalerID:", err
      });
    } else {
      res.json(property);
    }
  });
});

// GET HTTP for sold properties
router.get('/sold', (req, res, next) => {
  res.send("GET for sold properties")
});

// PUT HTTP request to edit a property and UPDATE. ID = wholesalerID
router.put('/editproperty/:id', (req, res, next) => {
  let id = req.params.id;

  wholesaler.updatePropertyForWholesaler(req.body, () => {
    // do not receive anything from callback;
  });

  property.editPropertyByID(req.body, (property) => {
    res.json(property);
  });
});

// DELETE HTTP request for deleting a property
router.delete('/:id', (req, res, next) => {
  // access the parameter which is the id of the item to be deleted
  let id = req.params.id;
  // call the model method deletePropertyById
  property.deletePropertyById(id, (err, property) => {
    if (err) {
      res.json({
        success: false,
        message: "Failed to delete property. Error: " + err
      });
    } else if (property) {
      res.json({
        success: true,
        message: "Property deleted successfully."
      });
    } else {
      res.json({
        success: false
      });
    }
  });
});

module.exports = router;