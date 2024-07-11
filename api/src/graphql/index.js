import {
  ChatTypedefs,
  UserTypeDefs,
  FollowshipTypedefs,
  PostTypeDefs,
} from "./typedefs/index.js"

import {
  UserResolvers,
  PostResolvers,
  ChatResolvers,
  FollowshipResolvers,
} from "./resolvers/index.js"

const RootTypedefs = `#graphql
  type Query{
        _:String
    }

    type Mutation{
        _:String
    }
`

export const typeDefs = [RootTypedefs, UserTypeDefs, PostTypeDefs, FollowshipTypedefs, ChatTypedefs]

export const resolvers = [UserResolvers, PostResolvers, FollowshipResolvers, ChatResolvers] 