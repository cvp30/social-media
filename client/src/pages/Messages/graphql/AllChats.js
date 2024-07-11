import { gql } from "@apollo/client";

export const ALL_CHATS = gql`
  query AllChats{
    allChats {
      id
      users {
        id
        username
        photoURL
      }
      lastMessage
      messageDate
      isSender
      unreadMessages
    }
  }
`