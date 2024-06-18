
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

  type UserInfo {
    user: User!
    followingList: [ID!]!
  }

  type RegisterResponse {
    token: String!
    userInfo: UserInfo!
  }

  type LoginResponse {
    token: String!
    userInfo: UserInfo!
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
    ): RegisterResponse!

    loginUser(
      email: String!
      password: String!
    ): LoginResponse!

    updateUser(
      userInputData: UserInputData
    ): User!
  }
`