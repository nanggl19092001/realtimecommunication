import { io } from 'socket.io-client'
import { SERVER_IP } from '../constaint'

const socketIO = io(`${SERVER_IP}`)

export default socketIO
