const multer = require('multer')
const messageModel = require('../models/message.model')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        
        if(file.mimetype.includes('image'))
            return cb(null, path.join(__dirname, '../public/messageImage'))
        
        return cb(null, path.join(__dirname, '../public/messageFile'))
        
    },
    filename: async function(req,file,cb) {

        const sender = req.body.sender
        const receiver = req.body.receiver
        
        const result = await messageModel.create({
            user1: sender,
            user2: receiver,
            message: "file",
            messageType: file.mimetype
        })
        
        const extension = file.mimetype.split("/")[1]
        cb(null, result._id + "." + extension)
    }
})

module.exports = multer({storage: storage})