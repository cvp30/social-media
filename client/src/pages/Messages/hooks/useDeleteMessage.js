import { useMutation } from "@apollo/client"
import { DELETE_MESSAGE } from "../graphql/DeleteMessage"
import { CHAT_INFO } from "../graphql/ChatInfo"

export const useDeleteMessage = (chatId) => {

  const [deleteMessage] = useMutation(DELETE_MESSAGE, {
    update: (cache, { data }) => {
      const { chat } = cache.readQuery({
        query: CHAT_INFO,
        variables: { chatId }
      })

      cache.modify({
        id: cache.identify(chat),
        fields: {
          messages(existingMessageRefs, { readField }) {

            return existingMessageRefs.filter(
              messageRef => data.deleteMessage !== readField('id', messageRef)
            )
          }
        }
      })
    }
  })

  return {
    deleteMessage
  }
}