import { ALL_POSTS } from "@/graphql/AllPosts"
import { DELETE_POST } from "@/graphql/DeletePost"
import { useMutation } from "@apollo/client"

export const useDeletePost = () => {

  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted: () => {
      console.log("deleted!")
    },
    onError: (error) => {
      console.log(error.message)
    },
    update: (cache, { data }) => {

      const postId = data.deletePost

      cache.updateQuery(
        { query: ALL_POSTS },
        (data) => ({
          allPosts: data.allPosts.filter(post => post.postId !== postId)
        })
      )
    }
  })

  return {
    deletePost
  }
}