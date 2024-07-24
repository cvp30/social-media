import { useMutation } from "@apollo/client"
import { DELETE_CHAT } from "../graphql/DeleteChat"
import { ALL_CHATS } from "../graphql/AllChats"


export const useDeleteChat = () => {

  const [deleteChat, { loading }] = useMutation(DELETE_CHAT, {
    update: (cache, { data: { deleteChat } }) => {

      cache.updateQuery(
        { query: ALL_CHATS },
        (data) => ({
          allChats: data.allChats.filter(user => user.id !== deleteChat)
        })
      )
    }
  })

  return {
    deleteChat,
    loading
  }
}