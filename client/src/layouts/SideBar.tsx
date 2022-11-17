import Button from '../components/Button'
import { HiOutlineLogout } from 'react-icons/hi'
import SideBarProps from '../types/SideBarProps'

export default function SideBar({rooms, setActive}: SideBarProps) {
  function handleLogout() {
    alert('Out!')
  }

  return (
    <>
      <div className="block border-l-4 border-lime-400 dark:border-lime-600">
        <h2 className="ml-4 font-semibold text-2xl tracking-wide">Simple Chat</h2>
      </div>
      <div className="h-full overflow-y-scroll flex flex-col space-y-2">
      {
        rooms?.map((room, index) => (
          <Button key={index} name={room} type="button" theme={2} onClick={() => setActive(room)} />
        ))
      }
      </div>
      <Button name="Logout" type="button" theme={3} onClick={handleLogout} 
        children={<HiOutlineLogout className="inline-block ml-2" />} 
      />
    </>
  )
}