const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const serviceAccount = require('../config/firebase.js');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "veeya-c0185.appspot.com"
});

const bucket = admin.storage().bucket('property-photos');

router.post('/upload', (req, res) => {
  console.log("req.body in upload:", req.body);
})

module.exports = router;