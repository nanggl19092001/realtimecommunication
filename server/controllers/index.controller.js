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
                return res.send(JSON.stringify({message: "Login successfully", status: 200, _id: result._id.toString()}))
            }
            else {
                return res.send(JSON.stringify({ message: "invalid account", status: 404}))
            }
        })
    }

    register(req,res) {
        const {firstname, lastname, password, birthday, email, phonenumber} = req.body

        const params = [firstname, lastname, password, birthday, email, phonenumber]

        accountModel.create({firstName: firstname, lastName: lastname, password: password, birthday: birthday, email: email, phoneNumber: phonenumber}, (err, result) => {
            console.log(result)
        })
    }
}

module.exports = new indexController