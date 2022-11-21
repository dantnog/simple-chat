import { Socket } from "socket.io-client"

export default interface ChatWindowProps {
  showSideBar: Function
  nick: string
  active: string
  socket: Socket
  avatar: string
}