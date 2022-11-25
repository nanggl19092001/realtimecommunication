const accountModel = require('../models/account.model')
const friendRequest = require('../models/friendRequest')
const friendModel = require('../models/friend.model')
const messageModel = require('../models/message.model')
const { default: mongoose } = require('mongoose')
class userController {
    getMessage(req, res) {
        const { a, b, limit } = req.query
        const user1Id = a
        const user2Id = b

        messageModel.find(
            {
                $or: [
                    {user1: mongoose.Types.ObjectId(user1Id), user2: mongoose.Types.ObjectId(user2Id)},
                    {user1: mongoose.Types.ObjectId(user2Id), user2: mongoose.Types.ObjectId(user1Id)}
                ]
            },[],
            { sort: { _id: -1 }, limit: limit}
            ,(err, results) => {
                if(err) 
                    return res.send(JSON.stringify({status: 500}))
                else {
                    return res.send(JSON.stringify(results))
                }
            }
        )
    }

    getConversation(req,res) {
        const id = req.params.id

        friendModel.find({
            $or: [
                {user1: mongoose.Types.ObjectId(id)},
                {user2: mongoose.Types.ObjectId(id)}
            ]
        }, (err, results) => {
            if(err) {
                console.log(err)
                return res.send(JSON.stringify({status: 500}))
            }
            else {
                let mappedUser = results.map(result => {
                    if(result.user1 == id)
                        return result.user2
                    else
                        return result.user1
                })

                messageModel.find(
                    {
                        $or: [
                            {user1: mongoose.Types.ObjectId(id), user2: {$in: mappedUser}},
                            {user2: mongoose.Types.ObjectId(id), user1: {$in: mappedUser}}
                        ]
                    }, { sort: {_id: -1}, limit: 1},
                    (err, results) => {
                        if(err){
                            console.log(err)
                        }
                        else{
                            
                            accountModel.find(
                                {_id: {$in: mappedUser}},
                                {password: 0, birthday: 0, email: 0, phoneNumber: 0}
                                , (err, accountResults) => {
                                if(err)
                                    console.log(err)
                                return res.send(
                                    JSON.stringify(
                                        { message: results, friends: accountResults }
                                    )
                                )
                            })
                        }
                    }
                )
            }
        })
    }

    addMessage(req,res) {
        const {sender, receiver, message} = req.body
        const io = res.io
        messageModel.create(
            {
                user1: sender,
                user2: receiver,
                message: message,
                messageType: 'text'
            }
            ,(err, results) => {
                if(err)
                    return res.send(JSON.stringify({status: 500}))
                else{
                    const message = results
                    io.to(receiver).emit('receive-message', {sender, message})
                    return res.send(JSON.stringify({status: 200, results: results}))
                }
            }
        )
    }

    addFileMessage(req,res) {

        const {sender, receiver} = req.body

        messageModel.create({
            user1: sender,
            user2: receiver,
            message: message,
            messageType: 'file'
        }
        ,(err, results) => {
            if(err)
                return res.send(JSON.stringify({status: 500}))
            else
                return res.send(JSON.stringify({status: 200}))
        })
    }

    getProfile(req,res) {
        const userId = req.params.id

        accountModel.find({
            _id: userId
        },
        {
            _id: 0,
            password: 0 
        }, (err, results) => {
            if(err)
                console.log(err)
            else
                res.send(JSON.stringify(results))
        })
    }

    getMessageTemp(req,res) {
        const id = req.params.id

        messageModel.find({$or: [
            {user1: mongoose.Types.ObjectId(id)},
            {user2: mongoose.Types.ObjectId(id)}
        ]}, 
        { sort: { _id: -1}, limit: 10}, 
        (err, results) => {
            if(err) {
                console.log(err)
                return res.send(JSON.stringify({status: 500}))
            }
            else return res.send(JSON.stringify(result))
        })

    }

    addFriends(req,res){
        const {user, friend} = req.body

        friendModel.create({user1: user, user2: friend}, (err, results) => {
            if(err)  {
                console.log(err)
                return res.send(JSON.stringify({status: 500, message: "failed"}))
            }
            else {
                return res.send(JSON.stringify({status: 200}))
            }
        })
    }

    pendingFriendRequest(req,res) {
        const id = req.params.id

        friendRequest.find(
            { 
                receiver: mongoose.Types.ObjectId(id),
                resolve: false
            }
        , (err, results) => {

        })
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
        const user = req.params.id

        friendRequest.find({receiver: user}, (err, results) => {
            if(err)
                return res.send(JSON.stringify({status: 400}))
            return res.send(JSON.stringify(results))
        })
    }

    friendRequest(req,res) {
        const {user, friend} = req.body

        friendRequest.create({sender: mongoose.Types.ObjectId(user), receiver: mongoose.Types.ObjectId(friend)}, (err,results) => {
            if(err) return res.send(JSON.stringify({status: 400}))
            
            res.io.to(friend).emit('receive-friendRequest', 'reload')
            return res.send(JSON.stringify({status: 200}))
        })
    }

    changePassword(req,res) {
        const {oldPassword, newPassword} = req.body
        const userId = req.params.id

        accountModel.find(
            {_id: userId, password: oldPassword},
            (err, results) => {
                if(err)
                    res.send(JSON.stringify({status: 500, err: err}))
                else if(results.length == 0)
                    return res.send(JSON.stringify({status: 404, message: 'wrong password'}))
                else{
                    accountModel.updateOne(
                        {_id: userId}, 
                        {$set: {password: newPassword}},
                        (err, results)=> {
                            if(err)
                                return res.send(JSON.stringify({status: 500, err: err}))
                            else
                                return res.send(JSON.stringify({status: 200}))
                        })
                }
            }
            )

        
    }

    async getProfileInfomation(req,res) {
        const {userProfile, user} = req.query

        try{
            const resultProfile = await accountModel.findOne({_id: userProfile},{
                password: 0 
            })
    
            const resultIsFriend = await friendModel.find({
                $or: [
                    {user1: user, user2: userProfile},
                    {user1: userProfile, user2: user}
                ]
            })
    
            const results = {
                profile: resultProfile,
                isFriend: resultIsFriend.length > 0
            }

            return res.send(JSON.stringify({status: 200, results: results}))
        }
        catch(err) {
            console.log(err)
            return res.send(JSON.stringify({status: 500}))
        }
        
    }

    unfriend(req,res) {
        const {user, friend} = req.body

        friendModel.deleteOne({
            $or: [
                {user1: user, user2: friend},
                {user1: friend, user2: user}
            ]
        }, (err,results) => {
            if(err){
                console.log(err)
                return res.send(JSON.stringify({status: 500}))
            }
            else{
                console.log(results)
                return res.send(JSON.stringify({status: 200}))
            }
        })
    }
}

module.exports = new userController