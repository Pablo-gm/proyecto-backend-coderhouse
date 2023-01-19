const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    type: { type: String, default: 'user', enum: ['user', 'system'], require: true },
    email: { type: String, require: true },
    body: { type: String, require: true },
},
{
    timestamps: true,
}
) 

module.exports = model('messages',messageSchema);