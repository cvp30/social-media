export const FollowshipTypedefs = `#graphql
  scalar Date

  type UserOutput implements UserBasicData {
    id: ID!
    photoURL: String
    username: String!
    slug: String!
    bio: String
  }

  extend type Query {
    followers: [UserOutput!]!
    following: [UserOutput!]!
    otherUsers: [UserOutput!]!
  }

  extend type Mutation {
    followUser(
      followUserId: ID!
    ): ID!
    unfollowUser(
      unfollowUserId: ID!
    ): ID!
  }
`