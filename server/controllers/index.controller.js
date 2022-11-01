const mongoose = require('mongoose')
const accountModel = require('../models/account.model')

class indexController{
    login(req,res) {
        const {email, password} = req.body

        accountModel.findOne({email: email, password: password}, (err, result) => {
            if(err) {
                return res.send(JSON.stringify({message: "Something went wrong", status: 500}))
            }

            if(result) {
                return res.send(JSON.stringify({message: "Login successfully", status: 200}))
            }
            else {
                return res.send(JSON.stringify({ message: "invalid account", status: 404}))
            }
        })
    }
}

module.exports = new indexController