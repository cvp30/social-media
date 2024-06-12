import { UserTypeDefs } from "./typedefs/UserTypeDefs.js"
import { UserResolvers } from "./resolvers/UserResolvers.js"

const RootTypedefs = `#graphql
  type Query{
        _:String
    }

    type Mutation{
        _:String
    }
`

export const typeDefs = [RootTypedefs, UserTypeDefs]

export const resolvers = [UserResolvers] 