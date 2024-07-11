import { gql } from "@apollo/client";
import { POST_DETAILS_FRAGMENT } from "./fragments/PostFragment";

export const ALL_POSTS = gql`
  query GetAllPosts{
    allPosts {
      ...PostDetails
    }
  }
  ${POST_DETAILS_FRAGMENT}
`