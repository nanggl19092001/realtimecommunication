const mongoose = require('mongoose')

const friendSchema = new mongoose.Schema(
    {
        emailUser1: {type: String, require: true},
        emailUser2: {type: String, require: true}
    }
)

module.exports = mongoose.model('friend', friendSchema)