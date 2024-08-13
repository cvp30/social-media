import { gql } from "@apollo/client";

export const GET_DATA_PROFILE = gql`
  query GetDataProfile($slug: String!){
    user(slug: $slug){
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
`