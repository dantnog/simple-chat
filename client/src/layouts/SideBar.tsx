import Button from '../components/Button'
import { HiOutlineLogout } from 'react-icons/hi'
import SideBarProps from '../types/SideBarProps'
import { IoMdMoon, IoMdSunny, IoMdClose } from 'react-icons/io'
import { useState } from 'react'

export default function SideBar({rooms, setActive, hideSideBar}: SideBarProps) {
  const [dark, setDark] = useState(false)

  function handleTheme() {
    document.documentElement.classList.toggle('dark')
    setDark(!dark)
  }

  return (
    <>
      <div className="py-2 border-l-4 border-lime-400 dark:border-lime-600 flex justify-between">
        <h2 className="ml-4 font-semibold text-2xl tracking-wide">Simple Chat</h2>
        <div className="flex space-x-2">
          {
          dark 
          ? <Button type="button" theme={3} onClick={handleTheme} children={<IoMdSunny />} />
          : <Button type="button" theme={3} onClick={handleTheme} children={<IoMdMoon />} />
          }
          <div className="block sm:hidden">
            <Button type="button" theme={3} onClick={() => hideSideBar()} children={<IoMdClose className="text-xl" />} />
          </div>
        </div>
      </div>
      <div className="h-full overflow-y-scroll flex flex-col space-y-2">
      {
        rooms?.map((room, index) => (
          <Button key={index} name={room} type="button" theme={2} onClick={() => setActive(room)} />
        ))
      }
      </div>
    </>
  )
}