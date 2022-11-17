import http from 'http'
import express from 'express'
import { Server } from 'socket.io'


const app = express()

const server = http.createServer(app)

const io = new Server(server)

io.on('connection', socket => {
  console.log('User in')

  socket.on('disconnect', () => {
    console.log('User out')
  })
} )

server.listen(5000, () => {
  console.log('SERVER RUNNING ON PORT 5000')
})

