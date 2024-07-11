import { useParams } from "react-router-dom"
import { ChatRoomContextProvider } from "../contexts/ChatRoomContext"

const ChatRoom = () => {

  const { chatId } = useParams()

  return (
    <ChatRoomContextProvider chatId={chatId}>
      <div className="w-full h-20 bg-[#ff00004a]">header</div>

    </ChatRoomContextProvider>
  )
}

export default ChatRoom