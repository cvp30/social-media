import { DELETE_POST } from "@/graphql/DeletePost"
import { useMutation } from "@apollo/client"
import toast from "react-hot-toast"

export const useDeletePost = () => {

  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted: () => {
      toast.success("Post deleted!")
    },
    onError: (error) => {
      toast.error(error.message)
    },
    update: (cache, { data }) => {

      const postIdDeleted = data.deletePost

      cache.evict({
        id: cache.identify({ id: postIdDeleted, __typename: 'Post' })
      })

      cache.gc()
    }
  })

  return {
    deletePost
  }
}