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

// POST HTTP to /properties/addproperty
router.post('/addproperty', (req, res, next) => {
  var newProperty = new property({
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
  property.addProperty(newProperty, (err, prop) => {
    if (err) {
      res.json({
        success: false,
        message: "Failed to create a new property. Error: " + err
      });
    } else {
      res.json({
        success: true,
        message: "Added property successfully. Property = " + prop
      });
    }
  });
});

// GET HTTP to /properties/id to see a specific property
router.get('/:id', (req, res, next) => {
  res.send("GET specific property")
});

// GET HTTP for sold properties
router.get('/soldproperties', (req, res, next) => {
  res.send("GET for sold properties")
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