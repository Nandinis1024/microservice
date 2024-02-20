const mongoose = require('mongoose');
const Joi = require('joi');
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

// productFeaturesSchema.plugin(toJSON);


// const productFeaturesJoiSchema = Joi.object({
//     _id: Joi.required(),
//     createdAt: Joi.required(),
//     updatedAt: Joi.required(),
//     isInactive: Joi.boolean().default(false),
//     isVisibleOnUi: Joi.boolean().default(true),
//     title: Joi.string().required(),
//     description: Joi.string(),
//     createdBy: Joi.string(),
//     updatedBy: Joi.string(),
// });


// productFeaturesSchema.pre('save', async function(next) {
//     try {
//         await productFeaturesJoiSchema.validateAsync(this.toObject());
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

const ProductFeatures = mongoose.model('ProductFeatures', productFeaturesSchema);

module.exports = ProductFeatures;