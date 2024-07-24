import { ALL_CHATS } from "../graphql/AllChats"
import { useMutation } from "@apollo/client"
import { CREATE_CHAT } from "../graphql/CreateChat"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export const useCreateChat = () => {

  const navigate = useNavigate()

  const [createChat, { loading }] = useMutation(CREATE_CHAT, {
    onCompleted: (data) => {
      const { newChat } = data
      navigate(`/messages/${newChat.id}`)
    },

    onError: (error) => {
      toast.error(error.message, {
        duration: 3000
      })
    },

    update: (cache, { data }) => {
      const { allChats } = cache.readQuery({
        query: ALL_CHATS
      })

      if (!allChats.some(chat => chat.id === data.newChat.id)) {
        cache.writeQuery({
          query: ALL_CHATS,
          data: {
            allChats: [...allChats, data.newChat]
          }
        })
      }
    }
  })

  return {
    createChat,
    creatingChat: loading
  }
}

