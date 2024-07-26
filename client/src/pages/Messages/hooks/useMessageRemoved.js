import { AuthContext } from "@/contexts/AuthContext"
import { useSubscription } from "@apollo/client"
import { MESSAGE_REMOVED } from "../graphql/subscriptions/MessageRemoved"
import { CHAT_INFO } from "../graphql/ChatInfo"
import { ALL_CHATS } from "../graphql/AllChats"


export const useMessageRemoved = (chatId) => {

  const { currUser } = AuthContext()

  useSubscription(MESSAGE_REMOVED, {
    variables: { chatId },

    onData: ({ client: { cache }, data }) => {

      // const {messageRemoved} = data.data

      // const { allChats } = cache.readQuery({
      //   query: ALL_CHATS
      // })

      // cache.writeQuery({
      //   query: ALL_CHATS,
      //   data: {
      //     allChats: allChats.map(chatItem => {
      //       return currUser.id
      //     })
      //   }
      // })

      // const {chat} = cache.readQuery({
      //   query: CHAT_INFO,
      //   variables: {chatId}
      // })
    }
  })
}