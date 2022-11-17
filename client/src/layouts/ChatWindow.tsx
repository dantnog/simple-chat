import Button from '../components/Button'
import { IoMdSend } from 'react-icons/io'
import { BsFillEmojiSmileFill } from 'react-icons/bs'
import Input from '../components/Input'
import { useEffect, useRef, useState } from 'react'
import ChatWindowProps from '../types/ChatWindowProps'
import MessageProps from '../types/MessageProps'

export default function ChatWindow({nick, active, socket}: ChatWindowProps) {
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState<MessageProps[]>([])
  const chat = useRef(null)

  function handleSubmit(e: any) {
    e.preventDefault()
    if (!message || !nick) return
    const msg = {nick, message, own: true, bot: false, room: active }
    socket.emit('message', msg)
    setHistory(prev => [...prev, msg])
    setMessage('')
  }

  function handleEmoji() {

  }

  useEffect(() => {
    // enable auto-scroll
    chat.current?.addEventListener('DOMNodeInserted', event => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
    });
  }, [])

  useEffect(() => {
    // clean history by changing room)
    setHistory([])
  }, [active])

  useEffect(() => {
    socket.on('message', data => {
      setHistory(prev => [...prev, data])
    })
  }, [socket])


  return (
    <>
      <div className="flex justify-between py-2 rounded-r-md bg-slate-300 dark:bg-slate-700 border-l-4 border-lime-400 dark:border-lime-600">
        {
          active
          ? <h2 className="ml-4 font-semibold text-2xl tracking-wide">{active}</h2>
          : <h2 className="ml-4 font-semibold text-2xl tracking-wide">Choose a room</h2>
        }
        {
          nick
          ? <p className="my-auto mr-4">{nick}</p>
          : null
        }
      </div>
      <div className="h-full overflow-y-scroll my-2 space-y-2" ref={chat}>
      {
        history?.map((item, index) => (
          <div className="block bg-slate-300 dark:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200 overflow-hidden rounded-md">
            {
              !item.own 
              ? item.bot 
                ? <h4 className="inline-block px-2 bg-lime-400 dark:bg-lime-600 tracking-wide text-slate-800 dark:text-slate-200">{item.nick}</h4>
                : <h4 className="inline-block px-2 bg-amber-400 dark:bg-amber-600 tracking-wide text-slate-800 dark:text-slate-200">{item.nick}</h4>
              : null
            }
            {
              item.own
              ? <p className="px-2 text-right">{item.message}</p>
              : <p className="inline-block px-2">{item.message}</p>
            }
          </div>
        ))
      }
      </div>
      <form onSubmit={handleSubmit} className="flex h-9 bg-slate-300 dark:bg-slate-700 rounded-lg overflow-hidden">
        <Button type="button" theme={4} onClick={handleEmoji} 
          children={<BsFillEmojiSmileFill className="" />} 
        />
        <Input value={message} onChange={setMessage} />
        <Button type="submit" theme={4}
          children={<IoMdSend className="" />} 
        />
      </form>
    </>
  )
}