import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation registerUser($email: String!, $username: String!, $password: String!){
    registerUser(email: $email, username: $username, password: $password) {
      token
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