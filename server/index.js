const express = require('express')
const app = express()
const connection = require('./database')
const routes = require('./routes/index.router')


const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const http = require('http').createServer(app)
const socketIO = require('socket.io')(http, {
    cors: '*'
})

const cors = require('cors')

app.use(cors())

socketIO.on('connection', (socket) => {
    console.log(socket.id + "connected")

    socket.on('join', (name) => {
        console.log(name)
    })

    socket.on('disconnect', () => {
        socket.disconnect()
        console.log('disconnected')
    })
})

routes(app)

http.listen(PORT, () => {
    console.log("SERVER UP AT PORT " + PORT)
})
