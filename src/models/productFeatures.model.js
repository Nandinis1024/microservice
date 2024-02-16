const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const productFeaturesSchema = mongoose.Schema(
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
        title:{
            type: String,
        },
        description:{
            type: String,
        },
    },
    {
        timestamps: true,
    }
)
const ProductFeatures = mongoose.model('ProductFeatures', productFeaturesSchema);

module.exports = ProductFeatures;