import { useQuery } from "@apollo/client"
import { POST_INFO } from "../graphql/GetPostQuery"

export const usePostInfo = (postId) => {

  const { loading, data, error } = useQuery(POST_INFO, {
    variables: { postId },
  })

  return {
    post: data?.post,
    loading,
    error
  }
}
