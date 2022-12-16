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
        const io = req.io

        const message = await messageModel.create({
            user1: sender,
            user2: receiver,
            message: "file",
            messageType: file.mimetype
        })
        
        io.to(receiver).emit('receive-message', {sender, message})
        const extension = file.mimetype.split("/")[1]
        cb(null, message._id + "." + extension)
    }
})

module.exports = multer({storage: storage})