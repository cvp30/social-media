export const FollowshipTypedefs = `#graphql
  scalar Date

  type UserOutput {
    id: ID!
    username: String
    photoURL: String
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
    ): UserOutput!
    unfollowUser(
      unfollowUserId: ID!
    ): UserOutput!
  }
`