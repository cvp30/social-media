import { useParams } from "react-router-dom"
import { ChatRoomContextProvider } from "../contexts/ChatRoomContext"
import ChatRoomFooter from "../components/ChatRoomFooter"
import ChatRoomBody from "../components/ChatRoomBody"
import ChatRoomHeader from "../components/ChatRoomHeader"

const ChatRoom = () => {

  const { chatId } = useParams()

  return (
    <ChatRoomContextProvider chatId={chatId}>
      <ChatRoomHeader />
      <ChatRoomBody />
      <ChatRoomFooter />
    </ChatRoomContextProvider>
  )
}

export default ChatRoom