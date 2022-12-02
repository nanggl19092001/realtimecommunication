const mongoose = require('mongoose')
const initAvatar = require('../middlewares/initAvatar')
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

    async register(req,res) {
        const {firstname, lastname, birthday, email, phonenumber, password} = req.body

        if(!firstname || !lastname || !password || !birthday || !email || !phonenumber){
            return res.send(JSON.stringify({status: 500, message: "Missing infomation"}))
        }
        try {

            const findUser = await accountModel.findOne({
                $or: [
                    {email: email},
                    {phoneNumber: phonenumber}
                ]
            })

            if(findUser){
                return res.send(JSON.stringify({status: 403, message: "email or phonenumber is already exist"}))
            }
            else {
                const createAccountResult = await accountModel.create({firstName: firstname, lastName: lastname, password: password, birthday: birthday, email: email, phoneNumber: phonenumber})

                initAvatar(createAccountResult._id)

                return res.send(JSON.stringify({status: 200, results: createAccountResult}))
            }

            
        } catch (error) {
            res.send(JSON.stringify({status: 500, message: "error"}))
        }

        
    }
}

module.exports = new indexController