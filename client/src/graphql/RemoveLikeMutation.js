import { gql } from "@apollo/client";

export const REMOVE_LIKE = gql`
  mutation RemoveLike($postId: ID!){
    removeLike(postId: $postId)
  }
`