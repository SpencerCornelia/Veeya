const express = require('express');
const router = express.Router();

// GET HTTP to /properties
// use this for testing to see all properties
router.get('/', (req,res) => {
    res.send("GET");
});

// POST HTTP to /properties/addproperty
router.post('/addproperty', (req, res, next) => {
  res.send("POST to add a new property");
});

// GET HTTP to /properties/id to see a specific property
router.get('/:id', (req, res, next) => {
  res.send("GET specific property")
});

// GET HTTP for sold properties
router.get('/soldproperties', (req, res, next) => {
  res.send("GET for sold properties")
});

router.delete('/:id', (req, res, next) => {
  res.send("DELETE a property");
});

module.exports = router;