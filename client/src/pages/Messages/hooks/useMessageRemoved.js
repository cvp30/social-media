import { useSubscription } from "@apollo/client"
import { MESSAGE_REMOVED } from "../graphql/subscriptions/MessageRemoved"
import { CHAT_INFO } from "../graphql/ChatInfo"
import { ALL_CHATS } from "../graphql/AllChats"


export const useMessageRemoved = (chatId) => {

  useSubscription(MESSAGE_REMOVED, {
    variables: { chatId },
    onData: ({ client: { cache }, data }) => {

      // UPDATE MESSAGES CHAT-------------------------------------------
      const chatInfo = cache.readQuery({
        query: CHAT_INFO,
        variables: { chatId }
      })

      const { messageRemoved } = data.data

      const { allChats } = cache.readQuery({
        query: ALL_CHATS,
      })


      if (chatInfo) {
        const { chat } = chatInfo

        cache.modify({
          id: cache.identify(chat),
          fields: {
            messages(existingMessageRefs, { readField }) {

              return existingMessageRefs.filter(
                messageRef => messageRemoved !== readField('id', messageRef)
              )
            }
          }
        })
      }

      cache.writeQuery({
        query: ALL_CHATS,
        data: {
          allChats: allChats.map(currChat => {
            return currChat.id === chatId && currChat.lastMessage.id === messageRemoved ?
              {
                ...currChat,
                lastMessage: {
                  ...currChat.lastMessage,
                  content: "message deleted"
                }
              }
              :
              currChat
          })
        }
      })
    }
  })
}