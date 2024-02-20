const express = require('express');
const ProductFeatures = require('../../models/productFeatures.model');
const isAdmin = require('../../middlewares/admin');

const router = express.Router();

router.post('/createFeatures', isAdmin , async (req, res) => {
    const newFeatures = new ProductFeatures(
        {
            title: req.body.title,
            description: req.body.description,
            createdBy: req.body.userId,
            updatedBy: req.body.userId
        }
    );
    await newFeatures.save();
    res.json(newFeatures);

})

router.get('/getFeatures', async (req, res) => {
    const features = await ProductFeatures.find();
    res.json(features);
});
  
  module.exports = router;