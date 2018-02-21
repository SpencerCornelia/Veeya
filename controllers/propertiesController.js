const express = require('express');
const router = express.Router();

// Add models
const wholesaler = require('../models/wholesaler');
const investor = require('../models/investor');
const property = require('../models/property');

// GET HTTP to /properties
// use this for testing to see all properties
router.get('/', (req,res) => {
  property.getAllProperties((error, response) => {
    if (error) {
      res.status(500).json({
        success: response.success,
        message: response.message,
        error: response.error
      });
    } else {
      res.status(200).json({
        success: response.success,
        message: response.message,
        properties: response.data
      });
    }
  });
});

router.get('/property/:uid', (req, res) => {
  property.getPropertyByID(req.params.uid, (error, response) => {
    if (error) {
      res.status(500).json({
        success: response.success,
        message: response.message,
        error: response.error
      });
    } else if (property) {
      res.status(200).json({
        success: response.success,
        message: response.message,
        property: response.data
      });
    }
  });
});

// GET HTTP for /properties for a wholesaler. uid = wholesalerID
router.get('/:uid', (req, res) => {
  wholesaler.getPropertiesForWholesaler(req.params.uid, (error, response) => {
    if (error) {
      res.status(500).json({
        success: response.success,
        message: response.message,
        error: response.error
      });
    } else if (response) {
      res.status(200).json({
        success: response.success,
        message: response.message,
        // wholesaler: response.data,
        properties: response.data.properties
      });
    } else {
      res.status(500).json({
        success: response.success,
        message: response.message
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
  property.addProperty(newProperty, req.body.wholesaler, (error, response) => {
    if (error) {
      res.status(500).json({
        success: response.success,
        message: response.message,
        error: response.error
      });
    } else if (property) {
      res.status(201).json({
        success: response.success,
        message: response.message,
        property: response.data
      });
    } else {
      res.status(500).json({
        success: response.success,
        message: response.message
      });
    }
  });
});

// GET HTTP to /properties/id to see a specific property
router.get('/editproperty/:id', (req, res, next) => {
  let id = req.params.id;

  property.getPropertyByID(id, (error, response) => {
    if (error) {
      res.status(500).json({
        success: response.success,
        message: response.message,
        error: response.error
      });
    } else if (property) {
      res.status(200).json({
        success: response.success,
        messsage: response.messsage,
        property: response.data
      });
    } else {
      res.status(500).json({
        success: response.success,
        message: response.message
      });
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

  wholesaler.updatePropertyForWholesaler(req.body, (error, response) => {
    if (error) {
      res.status(500).json({
        success: response.success,
        message: response.message,
        error: response.error
      });
    }
  });

  property.editPropertyByID(req.body, (error, response) => {
    if (error) {
      res.status(500).json({
        success: response.success,
        message: response.message,
        error: response.error
      });
    } else if (response) {
      res.status(201).json({
        success: response.success,
        message: response.message,
        property: response.data
      });
    } else {
      res.status(500).json({
        success: response.success,
        message: response.message
      });
    }
  });
});

// DELETE HTTP request for deleting a property
router.delete('/:id', (req, res, next) => {
  // access the parameter which is the id of the item to be deleted
  let id = req.params.id;
  // call the model method deletePropertyById
  property.deletePropertyById(id, (error, response) => {
    if (error) {
      res.status(500).json({
        success: response.success,
        message: response.message,
        error: response.error
      });
    } else if (response) {
      res.status(201).json({
        success: response.success,
        message: response.message
      });
    } else {
      res.status(500).json({
        success: response.success,
        message: response.message
      });
    }
  });
});

module.exports = router;