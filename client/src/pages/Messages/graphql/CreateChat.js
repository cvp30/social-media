import { gql } from "@apollo/client";

export const CREATE_CHAT = gql`
  mutation($user: ID!){
    newChat(user: $user) {
      id
      user {
        id
        photoURL
        username
        slug
        bio
      }
      lastMessage {
        id
        content
        sender {
          id
        }
        timestamp  
      }
      unreadMessages
    }
  }
`