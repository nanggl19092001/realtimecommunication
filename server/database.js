const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb+srv://admin:voice07101997@cluster0.3qabpdg.mongodb.net/?retryWrites=true&w=majority', (err) => {
    if(err) console.log(err)
    console.log("Connected")
})

module.exports = connection