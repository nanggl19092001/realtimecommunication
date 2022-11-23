const mongoose = require('mongoose')

const friendSchema = new mongoose.Schema(
    {
        user1: {type: mongoose.Types.ObjectId, require: true},
        user2: {type: mongoose.Types.ObjectId, require: true}
    }
)

module.exports = mongoose.model('friend', friendSchema)