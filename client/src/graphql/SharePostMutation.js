import { gql } from "@apollo/client";

export const SHARE_POST = gql`
  mutation SharePost($postId: ID!){
    sharePost(postId: $postId)
  }
`