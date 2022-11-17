import { useEffect, useState } from "react"
import ChatWindow from "./layouts/ChatWindow"
import SideBar from "./layouts/SideBar"
import io from 'socket.io-client'
import Input from "./components/Input"
import Button from "./components/Button"


const socket = io('http://localhost:5000')

function App() {
  const [nick, setNick] = useState('')
  const [nickSet, setNickSet] = useState(false)
  const [active, setActive] = useState<string>('')
  const rooms = ['Animes', 'Art', 'Astronomy', 'Atletism', 'Bikes', 'Cars', 'Cooking', 'Games', 'Health', 'Investments', 'Makeup', 'Movies', 'Music', 'Programming', 'School', 'Science', 'Travels', 'TV-Shows']

  function showSideBar() {
    document.getElementById('sidebar')?.classList.replace('hidden', 'flex')
    document.getElementById('chatwindow')?.classList.replace('flex', 'hidden' )
  }

  function hideSideBar() {
    document.getElementById('sidebar')?.classList.replace('flex', 'hidden')
    document.getElementById('chatwindow')?.classList.replace( 'hidden', 'flex' )
  }

  useEffect(() => {
    if (nick && active && nickSet) socket.emit('join-room', {nick, room: active})
  }, [active])

  return (
    <div className="h-screen w-screen grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 p-2 sm:p-4 bg-slate-200 dark:bg-slate-800 
      text-slate-600 dark:text-slate-400 relative"
    >
      <div id="sidebar" className="hidden sm:flex flex-col h-full overflow-auto space-y-2">
        <SideBar rooms={rooms} setActive={setActive} hideSideBar={hideSideBar} />
      </div>
      <div id="chatwindow" className="flex flex-col sm:col-span-2 lg:col-span-3 h-full overflow-auto">
        <ChatWindow active={active} nick={nick} socket={socket} showSideBar={showSideBar} />
      </div>


      {
        !nickSet ? <form onSubmit={() => nick ? setNickSet(true) : null} className="absolute space-y-2 bg-slate-100 dark:bg-slate-900 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col p-4">
          <div className="block py-2 border-l-4 border-lime-400 dark:border-lime-600">
            <h2 className="ml-4 font-semibold text-2xl tracking-wide">Set a nickname</h2>
          </div>
          <div className="bg-slate-300 dark:bg-slate-700 rounded-md h-8">
            <Input value={nick} onChange={setNick} />
          </div>
          <Button name="Done" type="submit" theme={1} />
        </form> : null
      }
    </div>
  )
}

export default App
