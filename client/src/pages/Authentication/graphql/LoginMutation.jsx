import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!){
    loginUser(email: $email, password: $password) {
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