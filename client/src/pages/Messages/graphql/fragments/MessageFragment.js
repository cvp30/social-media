import { gql } from "@apollo/client";

export const MESSAGE_FRAGMENT = gql`
  fragment MessageDetails on Message {
    id
    chatId:chat
    content
    sender {
      id
      photoURL
      username
      slug
      bio
    }
    isRead
    timestamp
  }
`