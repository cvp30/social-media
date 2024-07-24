import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { createContext, useContext } from "react"
import { CHAT_INFO } from '../graphql/ChatInfo'

const ChatDataContext = createContext()

export const ChatRoomContextProvider = ({ chatId, children }) => {

  const { data, loading } = useQuery(CHAT_INFO, {
    variables: { chatId }
  })

  return (
    <ChatDataContext.Provider value={{
      chatId,
      chat: data?.chat,
      loading,
      // isGroup: data?.chat.users.length > 1,
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
