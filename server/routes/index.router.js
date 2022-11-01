const indexController = require('../controllers/index.controller')

function routes(app) {
    app.post('/login', indexController.login)
}

module.exports = routes