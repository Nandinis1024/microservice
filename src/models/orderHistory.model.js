const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const orderHistorySchema = mongoose.Schema(
    {
        isInactive: { 
            type: Boolean, 
            default: false 
        },
        isVisibleOnUi: { 
            type: Boolean, 
            default: true 
        },
        productId: {
            type: String,
        },
        productValidityId: {
            type: String,
        },
        productPricingPerValidityId: {
            type: String,
        },
        validityInDays: { 
            type: Number 
        },
        validityOptionTitle: {
            type: String,
        },
        basePrice: { 
            type: Number 
        },
        maxAbsoluteDiscount: {
            type: Number,
            default: 0
        },
        applicableTax: {
            type: Number,
            default: 0
        },
        finalPrice: { 
            type: Number 
        },
        paymentMethod: {
            type: String,
            default: "card"
        },
        paymentId: {
            type: String,
        },
        paymentStatus: {
            type: String,
            default: "pending"
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
        features: [{}] // Schema for elements inside the array if needed
    },
    {
        timestamps: true,
    }
);

const OrderHistory = mongoose.model('OrderHistory', orderHistorySchema);

module.exports = OrderHistory;