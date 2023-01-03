const { Schema, model } = require('mongoose');

const productSchema = new Schema(
    {
        title: { type: String, required: true},
        price: { type: Number, required: true},
        thumbnail: { type: String, required: true},
        code: { type: String, required: true},
        description: { type: String, required: true},
        category: { type: String, default: "otra"},
        stock: { type: Number, required: true},
    },
    {
        timestamps: true, 
    }
)

module.exports = model('products',productSchema);