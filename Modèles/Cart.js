const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    UserId: {
        type: String,
        required: [true],
    },
    Items: [
        {
        ProductId: { 
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: [true],
        },
        Quantity: { 
            type: Number,
            required: [true, 'Please enter the quantity'],
            default: 1 },
        },
    ],
    TotalPrice: {
        type: Number,
        required: [true],
        default: 0,
    },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
