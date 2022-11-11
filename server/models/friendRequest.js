const mongoose = require('mongoose')

const friendSchema = new mongoose.Schema(
    {
        senderEmail: {type: String, require: true},
        receiverEmail: {type: String, require: true},
        sent: {type: Date, default: Date.now()},
        resolve: {type: Boolean, default: false}
    }
)

module.exports = mongoose.model('friend', friendSchema)