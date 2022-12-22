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

    socket.on('call', ({caller, receiver}) => {
        socket.to(receiver._id).emit('receive-call', caller)
    })

    socket.on('decline-call', (caller) => {
        
        socket.to(caller._id ? caller._id : caller).emit('receive-decline-call')
    })

    socket.on('streaming', () => {
        socket.broadcast.emit('streamed')
    })

    socket.on('disconnect', () => {
        socket.disconnect()
    })

    socket.on('join-video-call', (peerId, stream) => {
        console.log(peerId)
        socket.broadcast.emit('join-call', (peerId,stream))
    })

    

    // socket.on('accept-call', ({caller}) => {
    //     socket.to(caller).emit('answer')
    // })

    
})

routes(app)

http.listen(PORT, () => {
    console.log("SERVER UP AT PORT " + PORT)
})
