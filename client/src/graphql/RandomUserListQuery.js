import { gql } from "@apollo/client";

export const GET_RANDOM_USERS = gql`
  query GetRandomUsers{
    randomUsers{
      id
      slug
      username
      photoURL
      bio
    }
  }
`