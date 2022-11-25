const express = require('express')
const path = require('path')
const connection = require('./database')
const routes = require('./routes/index.router')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/public', express.static(path.join(__dirname,'./public')))

const http = require('http').createServer(app)
const socketIO = require('socket.io')(http, {
    cors: '*'
})

const cors = require('cors')

app.use((req, res, next) => {
    res.io = socketIO
    next()
})

app.use(cors())

socketIO.on('connection', (socket) => {

    socket.on('join', (id) => {
        socket.join(id)
    })

    socket.on('disconnect', () => {
        socket.disconnect()
    })
})

routes(app)

http.listen(PORT, () => {
    console.log("SERVER UP AT PORT " + PORT)
})
