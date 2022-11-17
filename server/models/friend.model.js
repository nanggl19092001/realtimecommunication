const mongoose = require('mongoose')

const friendSchema = new mongoose.Schema(
    {
        emailUser1: {type: mongoose.Types.ObjectId, require: true},
        emailUser2: {type: mongoose.Types.ObjectId, require: true}
    }
)

module.exports = mongoose.model('friend', friendSchema)