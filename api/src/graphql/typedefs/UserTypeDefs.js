
export const UserTypeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    username: String!
    slug: String!
    photoURL: String
    coverPhoto: String
    github: String
    linkedin: String
    portfolio: String
    bio: String
    location: String
  }

  type UserSession {
    user: User!
    token: String!
  }

  type UserInfo {
    user: User!
    followingList: [ID!]!
  }

  input UserInputData {
    username: String
    github: String
    linkedin: String
    portfolio: String
    photoURL: String
    coverPhoto: String
    bio: String
    location: String
  }

  extend type Query {
    user(
      slug: String!
    ): User!
    userProfile: UserInfo!
    allUsers: [User!]!
    randomUser: User!
  }

  extend type Mutation {
    registerUser(
      email: String!
      username: String!
      password: String!
    ): UserSession!

    loginUser(
      email: String!
      password: String!
    ): UserSession!

    updateUser(
      userInputData: UserInputData
    ): User!
  }
`