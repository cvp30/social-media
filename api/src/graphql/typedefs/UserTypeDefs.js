
export const UserTypeDefs = `#graphql
  scalar Date
  interface UserBasicData{
    id: ID!
    photoURL: String
    username: String!
    slug: String!
    bio: String
  }

  type User implements UserBasicData {
    id: ID!
    photoURL: String
    username: String!
    slug: String!
    bio: String
    email: String!
    coverPhoto: String
    github: String
    linkedin: String
    portfolio: String
    location: String
    timestamp: Date
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

  type PaginatedCommunityUsers {
    users: [User!]!
    page: Int!
    hasMore: Boolean!
    lastDate: Date
  }

  extend type Query {
    user(
      slug: String!
    ): User!
    userProfile: UserInfo!
    allUsers: [User!]!
    searchUsers(
      user: String!
    ): [User!]!
    communityUsers(
      user: String
      nPage: Int
      before: String
    ): PaginatedCommunityUsers!
    randomUsers: [User!]!
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
      userInputData: UserInputData!
    ): User!
  }
`