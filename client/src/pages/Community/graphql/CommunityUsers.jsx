import { gql } from "@apollo/client";

export const COMMUNITY_USERS = gql`
  query GetCommunityUsers($nPage: Int, $before: String) {
    communityUsers(nPage: $nPage, before: $before) {
      users {
        id
        photoURL
        username
        slug
        bio
      }
      lastDate
      page
      hasMore
      
    }
  }
`