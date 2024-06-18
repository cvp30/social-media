import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query GetProfile{
    userProfile {
      followingList
      user {
        id
        email
        slug
        username
        photoURL
        coverPhoto
        linkedin
        github
        portfolio
        bio
        location
      }
    }
  }
`