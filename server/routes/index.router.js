const indexController = require('../controllers/index.controller')
const userRouter = require('./user.router')

function routes(app) {
    app.post('/login', indexController.login)
    app.post('/register', indexController.register)
    app.use('/user', userRouter)
}

module.exports = routes