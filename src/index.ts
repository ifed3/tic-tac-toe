import 'dotenv/config'
import { Server as WebSocketServer } from 'ws'
import app from './server'
import { AppDataSource } from './database'

process.on('uncaughtException', function (error) {
    console.log(error)
})

// Initialize the database connection
AppDataSource.initialize()
    .then(() => console.log('Tables were initialized'))
    .catch((error) => console.log(error))

// Start up http server
const port = Number(process.env.PORT) || 3000
const server = app.listen(port, () => {
   console.log('Express server started on port: ' + port)
})

// Start up websocket server
const wss = new WebSocketServer({ server })
wss.on('connection', socket => {
    console.log('Connected')
    socket.on('message', message => console.log(message))
})