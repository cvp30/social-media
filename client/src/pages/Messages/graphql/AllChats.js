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
      lastMessage
      messageDate
      isSender
      unreadMessages
    }
  }
`