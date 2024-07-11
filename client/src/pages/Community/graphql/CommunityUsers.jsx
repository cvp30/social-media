import { gql } from "@apollo/client";

export const COMMUNITY_USERS = gql`
  query GetCommunityUsers{
    communityUsers {
      id
      photoURL
      username
      slug
      bio
    }
  }
`