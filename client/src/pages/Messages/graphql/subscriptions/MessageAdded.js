import { gql } from "@apollo/client";
import { MESSAGE_FRAGMENT } from "../fragments/MessageFragment";

export const MESSAGE_ADDED = gql`
  subscription MessageAdded($chatId: ID!) {
    messageAdded(chatId: $chatId) {
      ...MessageDetails
    }
  }

  ${MESSAGE_FRAGMENT}
`