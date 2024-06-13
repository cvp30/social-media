import { UserTypeDefs } from "./typedefs/UserTypeDefs.js"
import { PostTypeDefs } from "./typedefs/PostTypeDefs.js"
import { FollowshipTypedefs } from "./typedefs/FollowshipTypedefs.js"

import { UserResolvers } from "./resolvers/UserResolvers.js"
import { PostResolvers } from "./resolvers/PostResolvers.js"
import { FollowshipResolvers } from "./resolvers/FollowshipResolvers.js"

const RootTypedefs = `#graphql
  type Query{
        _:String
    }

    type Mutation{
        _:String
    }
`

export const typeDefs = [RootTypedefs, UserTypeDefs, PostTypeDefs, FollowshipTypedefs]

export const resolvers = [UserResolvers, PostResolvers, FollowshipResolvers] 