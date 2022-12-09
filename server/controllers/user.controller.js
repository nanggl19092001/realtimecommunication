const accountModel = require('../models/account.model')
const friendRequest = require('../models/friendRequest')
const friendModel = require('../models/friend.model')
const messageModel = require('../models/message.model')
const { default: mongoose } = require('mongoose')
class userController {

    readMessage(req, res) {
        const { user, friend } = req.body

        messageModel.updateMany({
            $or: [
                {
                    user1: mongoose.Types.ObjectId(user),
                    user2: mongoose.Types.ObjectId(friend)
                },
                {
                    user1: mongoose.Types.ObjectId(friend),
                    user2: mongoose.Types.ObjectId(user)
                }
            ]
        }, {
            read: true
        },(err, result) => {
            if(err){
                res.send(JSON.stringify({status: 500, message: err}))
            }
            else{
                res.send(JSON.stringify({status: 200}))
            }
        })
    }

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

    async getConversation(req,res) {
        const id = req.params.id

        try {
            const friends = await friendModel.find({
                $or: [
                    {user1: mongoose.Types.ObjectId(id)},
                    {user2: mongoose.Types.ObjectId(id)}
                ]
            })

            const lastestMessages = []
            for(let i = 0; i < friends.length; i++){

                const friendId = friends[i].user1.equals(id) ? friends[i].user2 : friends[i].user1

                const userInfo = await accountModel.findOne({
                    _id: friendId
                },
                {password: 0})

                const lastMess = await messageModel.findOne({
                    $or: [
                        {
                            user1: friendId,
                            user2: id
                        },
                        {
                            user1: id,
                            user2: friendId
                        }
                    ]
                },{},{sort: {_id: -1}})

                lastestMessages.push({
                    user: userInfo,
                    lastMess: lastMess
                })
            }
            
            return res.send(JSON.stringify({ friends: lastestMessages }))
        } catch (error) {
            return res.send(JSON.stringify({status: 500, message: error}))
        }
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

        accountModel.find(
            {$or: 
                [{email: 
                    {
                        $regex: info
                    }
                }, 
                {phoneNumber: 
                    {
                        $regex: info
                    }
                }]
        }
        ,
        {firstName: 1, lastName: 1, email: 1}, (err, results) => {
            if(err)
                return res.send(JSON.stringify({status: 400}))
            return res.send(JSON.stringify(results))
        })
    }

    async getFriendRequest(req,res) {
        const user = req.params.id
        try {
            const result = []

            const resultRequest = await friendRequest.find({receiver: user, status: false})

            for(let i = 0; i < resultRequest.length; i++){
                const account = await accountModel.findOne({
                    _id: resultRequest[i].sender,
                    
                }, {password: 0, email: 0, phonenumber: 0})

                result.push({
                    request: resultRequest[i],
                    account: account
                })
            }

            return res.send(JSON.stringify(result))
        }
        catch (e) {
            return res.send(JSON.stringify({status: 500}))
        }
    }

    friendRequest(req,res) {
        const {user, friend} = req.body

        friendRequest.create({sender: mongoose.Types.ObjectId(user), receiver: mongoose.Types.ObjectId(friend)}, (err,results) => {
            if(err) return res.send(JSON.stringify({status: 400}))
            
            res.io.to(friend).emit('receive-request', "new request")
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

            const pendingFriendRequest = await friendRequest.find({
                sender: user,
                receiver: userProfile,
                status: false
            })
    
            const results = {
                profile: resultProfile,
                isFriend: resultIsFriend.length > 0,
                pendingRequest: pendingFriendRequest.length > 0
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

    declineRequest(req,res) {
        const {requestId} = req.body

        friendRequest.updateOne({_id: requestId},
            {
                $set: {status: true}
            },
        (err,results) => {
            if(err)
                return res.send(JSON.stringify({status: 500}))
            else
                return res.send(JSON.stringify({status: 200}))
        })
    }

    async acceptFriend(req,res) {

        const {requestId, sender, receiver} = req.body
        try {
            const changeResult = await friendRequest.updateOne({_id: requestId},
                {
                    $set: {status: true}
                })
            
            const friendResult = await friendModel.create({
                user1: sender,
                user2: receiver
            })

            res.io.to(sender).emit('friend-accepted', 'accepted')
            return res.send(JSON.stringify({status: 200, results: friendResult}))
        } catch (error) {
            res.send(JSON.stringify({status: 500, err: error}))
        }
    }

}

module.exports = new userController