import { gql } from "@apollo/client";
import { CHAT_FRAGMENT } from "./fragments/ChatFragment";

export const ALL_CHATS = gql`
  query AllChats{
    allChats {
      ...ChatDetails
    }
  }

  ${CHAT_FRAGMENT}
`