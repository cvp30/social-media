import { gql } from "@apollo/client";
import { POST_DETAILS_FRAGMENT } from "./fragments/PostFragment";

export const CREATE_POST = gql`
  mutation CreatePost($parentPostId: ID, $content: String, $images: [String]) {
  createPost(parentPostId: $parentPostId, content: $content, images: $images) {
    ...PostDetails
  }

  }
  ${POST_DETAILS_FRAGMENT}
`