
export const ChatTypedefs = `#graphql
  scalar Date

  type ChatUser implements UserBasicData {
    id: ID!
    photoURL: String
    username: String!
    slug: String!
    bio: String
  }

  type Message {
    id: ID!
    chat: ID!
    sender: ChatUser!
    content: String
    isRead: Boolean
    timestamp: Date
  }

  type Chat {
    id: ID!
    users: [ChatUser!]!
    messages: [Message!]!
  }

  type GeneralChat {
    id: ID!
    users: [ChatUser!]!
    lastMessage: String
    messageDate: Date
    isSender: Boolean
    unreadMessages: Int
  }

  extend type Query {
    allChats: [GeneralChat!]!
    chat( 
      chatId: ID! 
    ): Chat!
  }

  extend type Mutation {
    newChat(
      users: [ID!]!
    ): ChatUser!
    
    deleteChat(
      chatId: ID!
    ): ID!

    newMessage(
      chatId: ID!
      message: String!
    ): Message!

    deleteMessage(
      chatId: ID!
      messageId: ID!
    ): ID!

  }

  extend type Subscription {
    messageAdded(
      chatId: ID!
    ): Message!

    messageRemoved(
      chatId: ID!
    ): ID!
  }
`