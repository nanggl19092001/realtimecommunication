const accountModel = require('../models/account.model')
const friendRequest = require('../models/friendRequest')
const friendModel = require('../models/friend.model')
const { default: mongoose } = require('mongoose')
class userController {
    getConversation(req,res) {
        const id = req.params.id

        
        
    }

    addFriends(req,res){

    }


    getFriends(req,res) {
        const id = req.params.id
        console.log(id)

        friendModel.find(
            {
                $or: [
                    {user1: mongoose.Types.ObjectId(id)},
                    {user2: mongoose.Types.ObjectId(id)}
                ]
            },
            (results) => {
                return res.send(JSON.stringify(results))
            }
        )
    } 

    searchUser(req,res) {
        const info = req.params.info

    accountModel.find({$or: 
        [{email: 
            {
                $regex: info
            }
        }, 
        {phoneNumber: 
            {
                $regex: info
            }
        }]}, 
        {firstName: 1, lastName: 1, email: 1}, (err, results) => {
            if(err)
                return res.send(JSON.stringify({status: 400}))
            return res.send(JSON.stringify(results))
        })
    }

    getFriendRequest(req,res) {
        const userEmail = req.params.email

        friendRequest.find({receiverEmail: userEmail}, (err, results) => {
            if(err)
                return res.send(JSON.stringify({status: 400}))
            return res.send(JSON.stringify(results))
        })
    }

    friendRequest(req,res) {
        const {userEmail, friendEmail} = req.body

        friendRequest.create({senderEmail: userEmail, receiverEmail: friendEmail}, (err,results) => {
            if(err) return res.send(JSON.stringify({status: 400}))

            return res.send(JSON.stringify({status: 200}))
        })
    }
}

module.exports = new userController