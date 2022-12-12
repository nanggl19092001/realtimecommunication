const express = require('express')
const { addFileMessage } = require('../controllers/user.controller')
const Router = express.Router()
const userController = require('../controllers/user.controller')

Router.post('/password/:id', userController.changePassword)

Router.get('/profile/:id', userController.getProfile)

Router.get('/profileinfo', userController.getProfileInfomation)

Router.get('/conversation/:id', userController.getConversation)

Router.get('/searchuser/:info', userController.searchUser)

Router.post('/message', userController.addMessage)

Router.post('/filemessage', addFileMessage)

Router.get('/message', userController.getMessage)

Router.put('/message', userController.readMessage)

Router.get('/friends/:id', userController.getFriends)

Router.delete('/friend', userController.unfriend)

Router.put('/friend', userController.acceptFriend)

Router.get('/friendrequest/:id', userController.getFriendRequest)

Router.put('/friendrequest', userController.declineRequest)

Router.post('/friendrequest', userController.friendRequest)


module.exports = Router