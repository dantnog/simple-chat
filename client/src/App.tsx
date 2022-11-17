import { useState } from "react"
import ChatWindow from "./layouts/ChatWindow"
import SideBar from "./layouts/SideBar"



function App() {
  const [rooms, setRooms] = useState([
    'art', 'cars', 'games', 'school'
  ])
  const [active, setActive] = useState('')

  return (
    <div className="h-screen w-screen grid grid-cols-4 p-4 bg-slate-200 dark:bg-slate-800 
      text-slate-600 dark:text-slate-400"
    >
      <div className="flex flex-col h-full space-y-2 pr-2">
        <SideBar rooms={rooms} setActive={setActive} />
      </div>
      <div className="flex flex-col col-span-3 h-full pl-2">
        <ChatWindow active={active} />
      </div>
    </div>
  )
}

export default App
