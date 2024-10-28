import { POST_DETAILS_FRAGMENT } from "@/graphql/fragments/PostFragment";
import { gql } from "@apollo/client";

export const USER_LIKES = gql`
  query GetUserLikes($slug: String!){
    userLikes(slug: $slug) {
      ...PostDetails
    }
  }
  ${POST_DETAILS_FRAGMENT}
`