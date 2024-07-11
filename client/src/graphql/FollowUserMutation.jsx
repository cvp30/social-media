import { gql } from "@apollo/client";

export const FOLLOW_USER = gql`
  mutation FollowUser($followUserId: ID!){
    followUser(followUserId: $followUserId) {
      id
      username
      photoURL
      slug
      bio
    }
  }
`