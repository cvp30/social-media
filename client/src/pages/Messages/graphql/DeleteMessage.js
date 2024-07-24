import { gql } from "@apollo/client";

export const DELETE_MESSAGE = gql`
  mutation($chatId: ID!, $messageId: ID!){
    deleteMessage(chatId: $chatId, messageId: $messageId)
  }
`