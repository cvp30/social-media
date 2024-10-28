import { gql } from "@apollo/client";

export const BOOKMARK_POST = gql`
  mutation BookmarkPost($postId: ID!){
    bookmarkPost(postId: $postId)
  }
`