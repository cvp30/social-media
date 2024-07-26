import { gql } from "@apollo/client";

export const ALL_CHATS = gql`
  query AllChats{
    allChats {
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