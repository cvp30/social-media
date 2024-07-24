import { useSubscription } from "@apollo/client"
import { MESSAGE_ADDED } from "../graphql/subscriptions/MessageAdded"
import { AuthContext } from "@/contexts/AuthContext"
import { CHAT_INFO } from "../graphql/ChatInfo"
import { MESSAGE_FRAGMENT } from "../graphql/fragments/MessageFragment"
import { ALL_CHATS } from "../graphql/AllChats"


export const useMessageAdded = (chatId) => {

  const { currUser } = AuthContext()

  useSubscription(MESSAGE_ADDED, {
    variables: { chatId },

    onData: ({ client: { cache }, data }) => {

      const { messageAdded } = data.data

      if (messageAdded.sender.id !== currUser.id) {
        // UPDATE MESSAGE CHAT ----------------------------
        const { chat } = cache.readQuery({
          query: CHAT_INFO,
          variables: { chatId }
        })

        cache.modify({
          id: cache.identify(chat),
          fields: {
            messages(existingMessageRefs = []) {
              const newMsgRef = cache.writeFragment({
                data: messageAdded,
                fragment: MESSAGE_FRAGMENT
              })
              return [...existingMessageRefs, newMsgRef]
            }
          }
        })

        // UPDATE CHAT LIST -------------------------------
        const { allChats } = cache.readQuery({
          query: ALL_CHATS,
        })

        cache.writeQuery({
          query: ALL_CHATS,
          data: {
            allChats: allChats.map(chatItem => {
              return chatItem.id === chatId ? {
                ...chatItem,
                lastMessage: messageAdded.content,
                messageDate: messageAdded.timestamp,
                isSender: false,
                unreadMessages: 0
              }
                :
                chatItem
            })
          }
        })

      }
    },
  })

  return true
}