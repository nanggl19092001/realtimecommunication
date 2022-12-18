const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema(
    {
        email: String,
        password: String,
        address: String,
        birthday: Date,
        firstname: String,
        lastname: String
    }
)

const conversationSchema = new Schema(
    {
        from: {
            type: Schema.Types.ObjectId,
            ref: 'Account'
        },
        to: {
            type: Schema.Types.ObjectId,
            ref: 'Account'
        },
        message: String,
        types: String,
        read: {type: Boolean, default: false},
        time: {type: Date, default: new Date}
    }
)

module.exports = { userSchema, conversationSchema }