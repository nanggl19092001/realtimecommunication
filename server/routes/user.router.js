const express = require('express')
const Router = express.Router()
const userController = require('../controllers/user.controller')

Router.post('/password/:id', userController.changePassword)

Router.get('/profile/:id', userController.getProfile)

Router.get('/conversation/:id', userController.getConversation)

Router.get('/friends/:id', userController.getFriends)

Router.get('/searchuser/:info', userController.searchUser)

Router.get('/message', userController.getMessage)

Router.post('/message', userController.addMessage)

Router.get('/friendrequest/:email', userController.getFriendRequest)

Router.post('/friendrequest', userController.friendRequest)


module.exports = Router