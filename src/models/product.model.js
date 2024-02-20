const mongoose = require('mongoose');
const Joi = require('joi');
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
            type: String
        },
        updatedBy: { 
            type: String
        },
        features: [{ 
        }]
    },
    {
        timestamps: true,
    }
)

// productSchema.plugin(toJSON);

// Define Joi schema for validation
// const productJoiSchema = Joi.object({
//     _id: Joi.required(),
//     createdAt: Joi.required(),
//     updatedAt: Joi.required(),
//     isInactive: Joi.boolean().default(false),
//     isVisibleOnUi: Joi.boolean().default(true),
//     productName: Joi.string().required(),
//     productDescription: Joi.string().max(250),
//     maxActiveUsersCount: Joi.number(),
//     createdBy: Joi.string(),
//     updatedBy: Joi.string(),
//     features: Joi.array().required(),
// });

// Validate data before saving
// productSchema.pre('save', async function(next) {
//     try {
//         await productJoiSchema.validateAsync(this.toObject());
//         next();
//     } catch (error) {
//         next(error);
//     }
// });


const Product = mongoose.model('Product', productSchema);

module.exports = Product;