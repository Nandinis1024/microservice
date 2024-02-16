const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const productSchema = mongoose.Schema(
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
        productName: { 
            type: String, 
             
        },
        productDescription: { 
            type: String, 
            maxlength: 250 
        },
        maxActiveUsersCount: { 
            type: Number
        },
        createdBy: { 
            type: Number
        },
        updatedBy: { 
            type: Number
        },
        features: [{ 
            _id: false,
            productFeatureId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductFeature' },
            value: { type: String }
        }]
    },
    {
        timestamps: true,
    }
)
const Product = mongoose.model('Product', productSchema);

module.exports = Product;