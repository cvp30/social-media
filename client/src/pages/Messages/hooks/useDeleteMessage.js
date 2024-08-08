import { useMutation } from "@apollo/client"
import { DELETE_MESSAGE } from "../graphql/DeleteMessage"
import toast from "react-hot-toast"

export const useDeleteMessage = () => {

  const [deleteMessage] = useMutation(DELETE_MESSAGE, {
    onError: (error) => {
      toast.error(error.message, {
        duration: 2000
      })
    },
  })

  return {
    deleteMessage
  }
}