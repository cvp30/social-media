import { Avatar, Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import defaultUser from '@/assets/defaultUser.jpg'
import { ChatRoomContext } from "../../contexts/ChatRoomContext"
import ChatSettings from "./ChatSettings"

const ChatRoomHeader = () => {

  const navigate = useNavigate()
  const { chat, loading } = ChatRoomContext()

  if (loading) return <div className="row-span-1 border-b-1 border-divider"></div>


  const handleReturn = () => {
    navigate('/messages')
  }

  return (
    <div className="relative row-span-1 border-b-1 border-divider flex justify-between items-center px-4">
      <div className="flex-1 flex items-center gap-4 ">
        <Button
          isIconOnly
          color="primary"
          variant="light"
          className="lg:hidden"
          radius="full"
          onClick={handleReturn}
        >
          <ArrowLeftIcon className="size-7" />
        </Button>
        <Avatar
          src={chat.user.photoURL || defaultUser}
          size='lg'
          alt="userImg"
        />

        <p className=' cursor-pointer text-xl line-clamp-1 font-bold flex-1'>
          {chat.user.username}
        </p>
      </div>

      <ChatSettings />
    </div>
  )
}

export default ChatRoomHeader