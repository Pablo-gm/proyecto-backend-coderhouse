const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
        buyer: {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },
        products: { type: Array, required: true },
        email: { type: String, require: true },
        status: { type: String, default: 'Generada', require: true },
        total: { type: Number, required: true },
        delivery_address: { type: String, require: true },
        order_number: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
) 

module.exports = model('orders',orderSchema);