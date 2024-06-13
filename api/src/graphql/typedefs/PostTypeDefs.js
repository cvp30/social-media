
export const PostTypeDefs = `#graphql
  scalar Date

  type Author {
    id: ID!
    slug: String!
    email: String!
    photoURL: String
  }

  type Post {
    id: ID!
    parentPostId: ID
    author: Author!
    content: String
    images: [String]!
    createdAt: Date!
    likes: [ID!]!
    shares: [ID!]!
    views: [ID!]!
  }

  extend type Query {
    allPosts: [Post!]!
    post(
      postId: ID!
    ): Post!
    userPosts(
      slug: String!
    ): [Post!]!
    comments(
      parentPostId: ID!
    ): [Post!]!
  }

  extend type Mutation {
    createPost(
      parentPostId: ID
      content: String
      images: [String]
    ): Post!

    deletePost(
      postId: ID!
    ): ID!

    addLike(
      postId: ID!
    ): ID!

    removeLike(
      postId: ID!
    ): ID!
  }

  type Subscription {
    postAdded: Post!
    # likeAdded: Post!
  }

`