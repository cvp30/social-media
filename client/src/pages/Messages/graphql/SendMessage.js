import { gql } from "@apollo/client";
import { MESSAGE_FRAGMENT } from "./fragments/MessageFragment";

export const SEND_MESSAGE = gql`
  mutation SendMessage($chatId: ID!, $message: String!){
  newMessage(chatId: $chatId, message: $message) {
    ...MessageDetails
  }
}

${MESSAGE_FRAGMENT}
`