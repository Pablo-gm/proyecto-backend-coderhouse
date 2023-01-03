const { Schema, model } = require('mongoose');

// cart id..
const userSchema = new Schema(
    {
        username: { type: String, required: true },
        fullname: { type: String, required: true },
        phone: { type: String, required: true },
        age: { type: Number, required: true },
        avatar: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        address: { type: String, required: true },
        is_admin: { type: Boolean, default: false },
        cart: { type: Schema.Types.ObjectId, ref: 'carts', required: true },
    },
    {
        timestamps: true, 
    }
)

module.exports = model('users',userSchema);