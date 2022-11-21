import { useEffect, useState } from "react"
import ChatWindow from "./layouts/ChatWindow"
import SideBar from "./layouts/SideBar"
import io from 'socket.io-client'
import Input from "./components/Input"
import Button from "./components/Button"
import { Buffer } from "buffer"


const socket = io('http://localhost:5000')

function App() {
  const api = 'https://avatars.dicebear.com/api'
  const [nick, setNick] = useState<string>('')
  const [nickSet, setNickSet] = useState<boolean>(false)
  const [avatar, setAvatar] = useState<string>('')
  const [avatars, setAvatars] = useState<string[]>([])
  const [active, setActive] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const options = ['avataaars', 'bottts', 'pixel-art', 'pixel-art-neutral', 'gridy', 'identicon']
  const rooms = ['Animes', 'Art', 'Astronomy', 'Atletism', 'Bikes', 'Cars', 'Cooking', 'Games', 'Health', 'Investments', 'Makeup', 'Movies', 'Music', 'Programming', 'School', 'Science', 'Travels', 'TV-Shows']

  function showSideBar() {
    document.getElementById('sidebar')?.classList.replace('hidden', 'flex')
    document.getElementById('chatwindow')?.classList.replace('flex', 'hidden' )
  }

  function hideSideBar() {
    document.getElementById('sidebar')?.classList.replace('flex', 'hidden')
    document.getElementById('chatwindow')?.classList.replace( 'hidden', 'flex' )
  }

  async function loadAvatars(name: string) {
    setLoading(true)
    let avatarsArr: string[] = []
    for (let i = 0; i < 6; i++) {
      await fetch(`${api}/${name}/${Math.random()*1000000000}.svg`)
        .then(res => res.arrayBuffer())
        .then(res => avatarsArr.push(new Buffer(res).toString('base64')))
    }
    setAvatars(avatarsArr)
    setLoading(false)
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
        <ChatWindow active={active} nick={nick} socket={socket} showSideBar={showSideBar} avatar={avatar} />
      </div>


      {
        !nickSet ? <form onSubmit={() => nick && avatar ? setNickSet(true) : null} className="absolute w-screen max-h-screen overflow-y-scroll sm:w-3/5 lg:w-1/2 space-y-2 bg-slate-100 dark:bg-slate-900 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col p-4">
          <div className="block py-2 border-l-4 border-lime-400 dark:border-lime-600">
            <h2 className="ml-4 font-semibold text-2xl tracking-wide">Set a nick and an avatar</h2>
          </div>
          <div className="bg-slate-300 dark:bg-slate-700 rounded-md h-8">
            <Input placeholder="nickname" value={nick} onChange={setNick} />
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="rounded-md overflow-hidden text-center">
              {
                options.map((item, index) => (
                  <button key={index} type="button" onClick={() => loadAvatars(item)}
                  className="py-1 px-2 bg-slate-300 dark:bg-slate-700 hover:bg-lime-400 dark:hover:bg-lime-600 hover:text-slate-800 dark:hover:text-slate-200" >{item}</button>
                ))
              }
            </div>
          </div>

          <div className="h-68">
            { 
              loading ? ( <div className="h-full grid place-items-center">
                <img src="./src/assets/infinity.svg" alt="Loading" className="bg-transparent" />
              </div> ) : null
            }
            <div className="grid grid-cols-3 gap-2 place-items-center">
            {
              !loading && avatars?.map((item, index) => (
                <img key={index} src={`data:image/svg+xml;base64,${item}`} onClick={() => setAvatar(item)}
                  alt="Avatar" className="h-28 hover:ring-4 ring-yellow-400 dark:ring-yellow-600 rounded-md cursor-pointer" />
              ))
            }
            </div>
          </div>
          <Button name="Done" type="submit" theme={1} />
        </form> : null
      }

    </div>
  )
}

export default App
