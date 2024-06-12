

export const BASIC_USER_INFO = `#graphql
  fragment BasicUserInfo on User {
    id: ID!
    username: String
    slug: String!
    photoURL: string
  }
`