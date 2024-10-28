import { gql } from "@apollo/client";


export const CHAT_FRAGMENT = gql`
  fragment ChatDetails on GeneralChat {
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
`