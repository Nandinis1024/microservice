const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const productPricingSchema = mongoose.Schema(
    {
        isInactive: 
        { 
            type: Boolean, 
            default: false 
        },
        isVisibleOnUi: { 
            type: Boolean, 
            default: true 
        },
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        productValidityId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductValidity',
            required: true
        },
        basePrice: { 
            type: Number
        },
        maxAbsoluteDiscount: { 
            type: Number,
            default: 0
        },
        createdBy: { 
            type: String
        },
        updatedBy: { 
            type: String
        },
    },
    {
        timestamps: true,
    }
)
const ProductPricing = mongoose.model('ProductPricing', productPricingSchema);

module.exports = ProductPricing;