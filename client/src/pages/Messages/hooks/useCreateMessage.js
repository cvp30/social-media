import { useMutation } from "@apollo/client"
import { SEND_MESSAGE } from "../graphql/SendMessage"
import { CHAT_INFO } from "../graphql/ChatInfo"
import { AuthContext } from "@/contexts/AuthContext"
import { MESSAGE_FRAGMENT } from "../graphql/fragments/MessageFragment"
import { CHAT_FRAGMENT } from "../graphql/fragments/ChatFragment"


export const useCreateMessage = (chatId, message) => {

  const { currUser } = AuthContext()

  const [sendMessage, { loading }] = useMutation(SEND_MESSAGE, {
    update: (cache, { data }) => {

      const { chat } = cache.readQuery({
        query: CHAT_INFO,
        variables: { chatId }
      })

      cache.modify({
        id: cache.identify(chat),
        fields: {
          messages(existingMessageRefs = []) {
            const newMsgRef = cache.writeFragment({
              data: data.newMessage,
              fragment: MESSAGE_FRAGMENT
            })
            return [...existingMessageRefs, newMsgRef]
          }
        }
      })

      // ---------------------------
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
            id: data.newMessage.id,
            content: data.newMessage.content,
            sender: {
              id: data.newMessage.sender.id
            },
            timestamp: data.newMessage.timestamp,
          },
          unreadMessages: 0,
        }
      })
    },
    optimisticResponse: {
      newMessage: {
        id: 'temp-MessageId',
        chatId: 'temp-chatId',
        content: message,
        sender: {
          id: currUser.id,
          photoURL: currUser.photoURL,
          username: currUser.username,
          slug: currUser.slug,
          bio: currUser.bio,
          __typename: 'User',
        },
        isRead: true,
        timestamp: new Date().toISOString(),
        __typename: 'Message',
      }
    }
  })

  return {
    sendMessage,
    loading
  }
}