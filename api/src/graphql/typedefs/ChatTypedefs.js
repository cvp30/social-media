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
    user: ChatUser!
    messages: [Message!]!
  }

  type GeneralChat {
    id: ID!
    user: ChatUser!
    lastMessage: Message
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
      user: ID!
    ): GeneralChat!
    
    deleteChat(
      chatId: ID!
    ): ID!

    newMessage(
      chatId: ID!
      message: String!
    ): Message!

    deleteMessage(
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

// lastMessage: String
//     messageDate: Date
//     isSender: Boolean
//     unreadMessages: Int