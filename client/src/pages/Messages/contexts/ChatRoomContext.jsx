import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { createContext, useContext } from "react"
import { CHAT_INFO } from '../graphql/ChatInfo'

const ChatDataContext = createContext()

export const ChatRoomContextProvider = ({ chatId, children }) => {

  const { chat, loading: chatLoading } = useQuery(CHAT_INFO)

  return (
    <ChatDataContext.Provider value={{
      chatId,
      chat,
      chatLoading,
      isGroup: Boolean(chat?.users.length),
    }}>
      {children}
    </ChatDataContext.Provider>
  )
}

export const ChatRoomContext = () => {
  return useContext(ChatDataContext)
}

ChatRoomContextProvider.propTypes = {
  chatId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
