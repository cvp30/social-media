import { useSubscription } from "@apollo/client"
import { MESSAGE_ADDED } from "../graphql/subscriptions/MessageAdded"
import { AuthContext } from "@/contexts/AuthContext"
import { CHAT_INFO } from "../graphql/ChatInfo"
import { MESSAGE_FRAGMENT } from "../graphql/fragments/MessageFragment"
import { CHAT_FRAGMENT } from "../graphql/fragments/ChatFragment"


export const useMessageAdded = (chatId) => {

  const { currUser } = AuthContext()

  useSubscription(MESSAGE_ADDED, {
    variables: { chatId },

    onData: ({ client: { cache }, data }) => {

      const { messageAdded } = data.data

      if (messageAdded.sender.id !== currUser.id) {
        // UPDATE MESSAGE CHAT ----------------------------
        const chatInfo = cache.readQuery({
          query: CHAT_INFO,
          variables: { chatId }
        })

        if (chatInfo) {
          const { chat } = chatInfo
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
        }

        // UPDATE CHAT LIST -------------------------------
        const existingChat = cache.readFragment({
          id: cache.identify({ id: chatId, __typename: 'GeneralChat' }),
          fragment: CHAT_FRAGMENT
        })

        cache.writeFragment({
          id: cache.identify({ id: chatId, __typename: 'GeneralChat' }),
          fragment: CHAT_FRAGMENT,
          data: {
            ...existingChat,
            lastMessage: {
              id: messageAdded.id,
              content: messageAdded.content,
              sender: {
                id: messageAdded.sender.id
              },
              timestamp: messageAdded.timestamp,
            },
            unreadMessages: existingChat.unreadMessages + 1,
          }
        })
      }
    },
  })

  return true
}