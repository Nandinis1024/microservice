const express = require('express');
const ProductFeatures = require('../../models/productFeatures.model');

const router = express.Router();

router.post('/createFeatures', async (req, res) => {
    const newFeatures = new ProductFeatures(req.body);
    await newFeatures.save();
    res.json(newFeatures);

})

router.get('/getFeatures', async (req, res) => {
    const features = await ProductFeatures.find();
    res.json(features);
})
  
  module.exports = router;