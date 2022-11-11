import { io } from "socket.io-client"
import { SERVER_IP } from "../constaint"
const socket = io(`${SERVER_IP}`, {transports: ['websocket']})

export default socket