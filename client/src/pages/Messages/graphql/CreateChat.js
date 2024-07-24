import { gql } from "@apollo/client";

export const CREATE_CHAT = gql`
  mutation($user: ID!){
    newChat(user: $user) {
      id
      user {
        id
        username
        photoURL
        slug
        bio
      }
      lastMessage
      messageDate
      isSender
      unreadMessages
    }
  }
`