const express = require('express')
const path = require('path')
const {ExpressPeerServer} = require('peer')
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

const peerServer = ExpressPeerServer(http, {
    debug: true,
    path: '/call'
})

const cors = require('cors')

app.use((req, res, next) => {
    res.io = socketIO
    next()
})

app.use('/call', peerServer)

app.use(cors())

socketIO.on('connection', (socket) => {

    socket.on('join', (id) => {
        socket.join(id)
    })

    socket.on('call', ({caller, receiver}) => {
        console.log(caller, receiver)
        socket.to(receiver._id).emit('receive-call', caller)
    })

    socket.on('disconnect', () => {
        socket.disconnect()
    })

    socket.on('decline-call', (caller) => {
        socket.to(caller).emit('receive-decline-call')
    })

    socket.on('accept-call', ({caller}) => {
        socket.to(caller).emit('answer')
    })

    socket.on('join-call-room', ({roomID, peerID, socketID, user}) => {
        socket.to(roomID).broadcast.emit("user connected", {
            peerID,
            user,
            roomID,
            socketID
        })
    })
})

routes(app)

http.listen(PORT, () => {
    console.log("SERVER UP AT PORT " + PORT)
})
