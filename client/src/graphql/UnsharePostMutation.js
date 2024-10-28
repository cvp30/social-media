import { gql } from "@apollo/client";

export const UNSHARE_POST = gql`
  mutation UnsharePost($postId: ID!){
    unsharePost(postId: $postId)
  }
`