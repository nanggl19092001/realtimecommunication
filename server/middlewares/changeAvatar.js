const fs = require('fs')
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(req.body)
        let files = fs.readdirSync(path.join(__dirname, '../public/avatar'))
        if(files.includes(req.body.sender + '.jpg')){
            fs.unlinkSync(path.join(__dirname, '../public/avatar/' + req.body.sender + '.jpg'))
        }
        cb(null, path.join(__dirname, '../public/avatar'))
    },
    filename: function(req, file, cb) {
        cb(null, req.body.sender + '.jpg')
    }
})

module.exports = multer({storage: storage})