const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },
        quantity: { type: Number}
    }],
    email: { type: String, require: true },
    delivery_address: { type: String, require: true },
},
{
    timestamps: true,
}
) 

module.exports = model('carts',cartSchema);