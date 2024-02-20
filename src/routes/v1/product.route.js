const express = require('express');
const Product = require('../../models/product.model');
const ProductValidity = require('../../models/productValidity.model');
const ProductPricing = require('../../models/productPricing.model');
const User = require('../../models/user.model');
const stripe = require('stripe')('sk_test_51OkvUsSIy7xLF6FWJ2RapUjCxGtrYUvSCBWhRwOiIdl10rclf3wjpApvy9OsLOBSaNjwMuKMYt907XrRAGF6RTQ300FJEj2Aoe');
const isAdmin = require('../../middlewares/admin');




const router = express.Router();

const mapValidityOptionTitle = (validityInDays) => {
  let validityOptionTitle = '';
  if (validityInDays == 30) {
    validityOptionTitle = '1 month';
  } else if (validityInDays == 90) {
    validityOptionTitle = '3 months';
  } else if (validityInDays == 365) {
    validityOptionTitle = '1 year';
  } else {
    validityOptionTitle = 'Custom';
  }
  return validityOptionTitle;
};

const mapBasePrice = (productName, validityInDays) => {
  let basePrice = 0;
  
  
  const days = parseInt(validityInDays);

 
  if (productName == 'Personal') {
    if (days == 30) {
      basePrice = 9999;
    } else if (days == 90) {
      basePrice = 24999;
    } else if (days == 365) {
      basePrice = 99999;
    }
  } else if (productName == 'Small Business') {
    if (days == 30) {
      basePrice = 34999;
    } else if (days == 90) {
      basePrice = 87499;
    } else if (days == 365) {
      basePrice = 349999;
    }
  } else if (productName == 'Large Business') {
    if (days == 30) {
      basePrice = 69999;
    } else if (days == 90) {
      basePrice = 174999;
    } else if (days == 365) {
      basePrice = 699999;
    }
  } else if (productName == 'Enterprise') {
    basePrice = 0;
  }
  
  return basePrice;
};



router.post('/createProducts', isAdmin, async (req, res) => {
    try {
      const { productName, productDescription, maxActiveUsersCount, validityInDays, maxAbsoluteDiscount} = req.body;
      const newProduct = new Product({
        productName,
        productDescription,
        maxActiveUsersCount,
        createdBy: req.body.userId,
        updatedBy: req.body.userId,
        features: req.body.features
      });
      
      const savedProduct = await newProduct.save();
      
      const validityOptionTitle = mapValidityOptionTitle(validityInDays);
      const newProductValidity = new ProductValidity({
        productId: savedProduct._id,
        validityInDays,
        validityOptionTitle,
        createdBy: req.body.userId,
        updatedBy: req.body.userId
      });
      await newProductValidity.save();
      
      const basePrice = mapBasePrice(productName, validityInDays);
      const newProductPricing = new ProductPricing({
        productId: savedProduct._id,
        productValidityId: newProductValidity._id,
        basePrice,
        maxAbsoluteDiscount,
        createdBy: req.body.userId,
        updatedBy: req.body.userId
      });
      await newProductPricing.save();

  
      res.status(201).json(newProductPricing);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'wrong!' });
    }
  });
  
  router.post('/userId', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if(!user){
      return res.status(400).send('Email does not exist');  
    }
    res.status(200).json(user._id);
  })

  router.get('/getProducts', async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'wrong!' });
    }
  });

  router.get('/getProductsPricing', async (req, res) => {
    try {
      const productsPricing = await ProductPricing.find();
      res.status(200).json(productsPricing);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'wrong!' });
    }
  });

  router.get('/getProductsValidity', async (req, res) => {
    try {
      const productsValidity = await ProductValidity.find();
      res.status(200).json(productsValidity);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'wrong!' });
    }
  });

  router.patch('/deleteProduct/:productId' , async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      product.isInactive = true;
      await product.save();
      res.status(200).json("Product deleted successfully");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'wrong!' });
    }
  });

  router.patch('/visibilityProduct/:productId' , async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      if(product.isVisibleOnUi == true){
        product.isVisibleOnUi = false;
      }
      else{
        product.isVisibleOnUi = true;
      }
      await product.save();
      res.status(200).json("Product visibility updated successfully");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'wrong!' });
    }
  });

  router.post('/createCheckoutSession', async (req, res) => {
    const {quantity, productPrice, productName, userId} = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: productName,
            },
            unit_amount: Math.round(productPrice * 100),
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
    console.log('session', session);
    res.json({ id: session.id});
  });


module.exports = router;
