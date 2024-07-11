import { gql } from "@apollo/client";

export const CHAT_INFO = gql`
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      id
      users {
        id
        username
        photoURL
      }
      messages {
        id
        content
        sender {
          id
          username
          photoURL
        }
        isRead
        timestamp
      }
    }
  }
`