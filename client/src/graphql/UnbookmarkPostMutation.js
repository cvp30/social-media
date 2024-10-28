import { gql } from "@apollo/client";

export const UNBOOKMARK_POST = gql`
  mutation UnbookmarkPost($postId: ID!){
    unbookmarkPost(postId: $postId)
  }
`