const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const productValiditySchema = mongoose.Schema(
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
        validityInDays: { 
            type: Number
        },
        validityOptionTitle: { 
            type: String
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
const ProductValidity = mongoose.model('ProductValidity', productValiditySchema);

module.exports = ProductValidity;