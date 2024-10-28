import { gql } from "@apollo/client";

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($unfollowUserId: ID!){
    unfollowUser(unfollowUserId: $unfollowUserId)
  }
`