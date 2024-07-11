import { gql } from "@apollo/client";

export const POST_DETAILS_FRAGMENT = gql`
  fragment PostDetails on Post {
    postId:id
    parentPostId
    content
    createdAt
    images
    likes
    shares
    author {
      id
      username
      photoURL
      slug
      bio
    }
  }
`