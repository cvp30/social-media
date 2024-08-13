import { POST_DETAILS_FRAGMENT } from "@/graphql/fragments/PostFragment";
import { gql } from "@apollo/client";

export const USER_POSTS = gql`
  query GetUserPosts($slug: String!){
    userPosts(slug: $slug) {
      ...PostDetails
    }
  }
  ${POST_DETAILS_FRAGMENT}
`