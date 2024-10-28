import { useQuery } from "@apollo/client"
import { COMMENTS_LIST } from "../graphql/GetCommentsList"

export const useComments = (postId) => {

  const { loading, data, error } = useQuery(COMMENTS_LIST, {
    variables: { postId },
  })

  return {
    comments: data?.comments,
    loading,
    error
  }
}