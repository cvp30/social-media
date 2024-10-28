import { POST_DETAILS_FRAGMENT } from "@/graphql/fragments/PostFragment";
import { gql } from "@apollo/client";

export const COMMENTS_LIST = gql`
  query GetCommentsList($postId: ID!){
    comments(postId: $postId) {
      ...PostDetails
    }
  }
  ${POST_DETAILS_FRAGMENT}
`