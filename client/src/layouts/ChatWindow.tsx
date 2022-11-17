import Button from '../components/Button'
import { IoMdSend } from 'react-icons/io'
import { BsFillEmojiSmileFill } from 'react-icons/bs'
import Input from '../components/Input'
import { useState } from 'react'
import ChatWindowProps from '../types/ChatWindowProps'
import MessageProps from '../types/MessageProps'

export default function ChatWindow({active}: ChatWindowProps) {
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState<MessageProps[]>([
    {nick: 'John', message: 'Hello!', own: false, bot: false},
    {nick: 'Damian', message: 'Sup!', own: false, bot: false},
    {nick: 'Abgail', message: 'Tchau', own: true, bot: false},
    {nick: 'BOT', message: 'Abgail is out', own: false, bot: true},
  ])

  function handleSubmit() {
    if (!message) return
  }

  function handleEmoji() {

  }

  return (
    <>
      <div className="block bg-slate-300 dark:bg-slate-700 border-l-4 border-lime-400 dark:border-lime-600">
        <h2 className="ml-4 font-semibold text-2xl tracking-wide">{active}</h2>
      </div>
      <div className="h-full overflow-y-scroll py-2 space-y-2">
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
      <div className="flex h-9 bg-slate-300 dark:bg-slate-700 rounded-lg overflow-hidden">
      <Button type="button" theme={4} onClick={handleEmoji} 
        children={<BsFillEmojiSmileFill className="" />} 
      />
      <Input value={message} onChange={setMessage} />
      <Button type="button" theme={4} onClick={handleSubmit} 
        children={<IoMdSend className="" />} 
      />
      </div>
    </>
  )
}