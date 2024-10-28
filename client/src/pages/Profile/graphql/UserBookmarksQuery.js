import { POST_DETAILS_FRAGMENT } from "@/graphql/fragments/PostFragment";
import { gql } from "@apollo/client";

export const USER_BOOKMARKS = gql`
  query GetUserBookmarks($slug: String!){
    userBookmarks(slug: $slug) {
      ...PostDetails
    }
  }
  ${POST_DETAILS_FRAGMENT}
`