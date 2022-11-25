const mongoose = require('mongoose')

const friendSchema = new mongoose.Schema(
    {
        sender: {type: mongoose.Types.ObjectId, require: true},
        receiver: {type: mongoose.Types.ObjectId, require: true},
        sent: {type: Date, default: Date.now()},
        status: {type: Boolean, default: false}
    }
)

module.exports = mongoose.model('friendrequest', friendSchema)