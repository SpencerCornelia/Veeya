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
      return response;
    })
    .then((response) => {
      return property.getPropertiesById(response.data)
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
      return response;
    })
    .then((response) => {
      return property.getPropertiesById(response.data);
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
      return response;
    })
    .then((response) => {
      return property.getPropertiesById(response.data);
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
      return response;
    })
    .then((response) => {
      return user.addWholesalerListing(response.data._id, req.body.wholesaler_id);
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

// POST HTTP request to mark a property as sold-pending
router.post('/soldpropertypending', (req, res) => {
  let propertyId = req.body.property._id;
  let wholesalerId = req.body.property.wholesaler_id;
  let investorId = req.body.investorId;
  property.updatePropertySoldPending(propertyId)
    .then((response) => {
      return user.updateWholesalerSoldPendingProperties(wholesalerId, propertyId, false,);
    })
    .then((response) => {
      return user.updateInvestorBoughtPendingProperties(investorId, propertyId, false);
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

router.post('/soldpropertyaccepted', (req, res) => {
  let propertyId = req.body.property._id;
  let wholesalerId = req.body.property.wholesaler_id;
  let investorId = req.body.investorId;
  property.updatePropertySoldAccepted(propertyId)
    .then((response) => {
      return user.updateWholesalerSoldProperties(wholesalerId, propertyId);
    })
    .then((response) => {
      return user.updateInvestorBoughtProperties(investorId, propertyId);
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

router.post('/denysoldproperty', (req, res) => {
  let propertyId = req.body.property._id;
  let wholesalerId = req.body.property.wholesaler_id;
  let investorId = req.body.investorId;
  property.updatePropertyDenySold(propertyId)
    .then((response) => {
      return user.updateWholesalerSoldPendingProperties(wholesalerId, propertyId, true);
    })
    .then((response) => {
      return user.updateInvestorBoughtPendingProperties(investorId, propertyId, true);
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