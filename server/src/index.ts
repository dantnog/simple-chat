import http from 'http'
import express from 'express'
import { Server } from 'socket.io'
import Users from './Users'


const app = express()

const server = http.createServer(app)

const io = new Server(server)


io.on('connection', socket => {
  socket.on('join-room', data => {
    // remove user from last room
    let user = Users.getUser(socket.id)
    if (user) {
      socket.leave(user.room)
      socket.to(user.room).emit('message', {
        nick: 'BOT', 
        message: `${user.nick} has left`,
        own: false,
        bot: true
      })
    }
    // set new room
    socket.join(data.room)
    socket.to(data.room).emit('message', {
      nick: 'BOT', 
      message: `${data.nick} has joined`,
      own: false,
      bot: true
    })
    Users.setUser(socket.id, data.nick, data.room)
  })

  socket.on('message', data => {
    socket.to(data.room).emit('message', {
      nick: data.nick, 
      message: data.message,
      own: false,
      bot: false, 
      avatar: data.avatar
    })
  })

  socket.on('disconnect', () => {
    let user = Users.getUser(socket.id)
    if (user) socket.to(user.room).emit('message', {
      nick: 'BOT', 
      message: `${user.nick} has left`,
      own: false,
      bot: true
    })
    Users.deleteUser(socket.id)
  })
} )

server.listen(5000, () => {
  console.log('SERVER RUNNING ON PORT 5000')
})

