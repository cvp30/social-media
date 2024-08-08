import { gql } from "@apollo/client";

export const MESSAGE_REMOVED = gql`
  subscription MessageRemoved($chatId: ID!) {
    messageRemoved(chatId: $chatId)
  }
`