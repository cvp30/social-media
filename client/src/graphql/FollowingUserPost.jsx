import { gql } from "@apollo/client";
import { POST_DETAILS_FRAGMENT } from "./fragments/PostFragment";

export const ALL_FOLLOWING_USER_POSTS = gql`
  query GetAllFollowingUserPosts{
    allFollowingUserPost {
      ...PostDetails
    }
  }
  ${POST_DETAILS_FRAGMENT}
`