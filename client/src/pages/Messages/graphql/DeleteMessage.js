import { gql } from "@apollo/client";

export const DELETE_MESSAGE = gql`
  mutation($messageId: ID!){
    deleteMessage(messageId: $messageId)
  }
`