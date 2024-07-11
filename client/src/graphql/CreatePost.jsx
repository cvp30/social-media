import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($parentPostId: ID, $content: String, $images: [String]) {
  createPost(parentPostId: $parentPostId, content: $content, images: $images) {
    id
    parentPostId
    content
    createdAt
    images
    likes
    shares
    author {
      id
      username
      slug
    }
  }
}
`