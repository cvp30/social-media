import { gql } from "@apollo/client";

export const DELETE_CHAT = gql`
  mutation($chatId: ID!){
    deleteChat(chatId: $chatId)
  }
`