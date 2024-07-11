import { gql } from "@apollo/client";

export const SEARCH_USERS = gql`
  query SearchUsers($user: String!){
    searchUsers(user: $user) {
      id
      slug
      username
      photoURL
    }
  }
`