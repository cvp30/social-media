import { POST_DETAILS_FRAGMENT } from "@/graphql/fragments/PostFragment";
import { gql } from "@apollo/client";

export const POST_INFO = gql`
  query GetPostInfo($postId: ID!){
    post(postId: $postId) {
      ...PostDetails
    }
  }
  ${POST_DETAILS_FRAGMENT}
`