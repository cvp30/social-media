
export const PostTypeDefs = `#graphql
  scalar Date

  type Author implements UserBasicData {
    id: ID!
    photoURL: String
    username: String!
    slug: String!
    bio: String
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
  }

  extend type Query {
    allPosts: [Post!]!
    allFollowingUserPost: [Post!]!
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