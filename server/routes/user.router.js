const express = require('express')
const Router = express.Router()
const userController = require('../controllers/user.controller')

Router.get('/conversation', userController.getConversation)

module.exports = Router