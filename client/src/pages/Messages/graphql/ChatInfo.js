import { gql } from "@apollo/client";
import { MESSAGE_FRAGMENT } from "./fragments/MessageFragment";

export const CHAT_INFO = gql`
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      id
      user {
        id
        username
        photoURL
        slug
        bio
      }
      messages {
        ...MessageDetails
      }
    }
  }

  ${MESSAGE_FRAGMENT}
`