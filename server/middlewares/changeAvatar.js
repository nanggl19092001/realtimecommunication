const fs = require('fs')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(file)
    },
    filename: function(req, file, cb) {
        console.log(file)
    }
})

module.exports = multer({storage: storage})