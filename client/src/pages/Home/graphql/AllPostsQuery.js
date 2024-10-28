import { POST_DETAILS_FRAGMENT } from "@/graphql/fragments/PostFragment";
import { gql } from "@apollo/client";

export const ALL_POSTS = gql`
  query GetAllPosts($nPage: Int, $before: String){
    allPosts(nPage: $nPage, before: $before) {
      page
      hasMore
      lastDate
      posts{
        ...PostDetails
      }
    }
  }
  ${POST_DETAILS_FRAGMENT}
`