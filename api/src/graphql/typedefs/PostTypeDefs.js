
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
    comments: [ID!]!
    likes: [ID!]!
    shares: [ID!]!
    bookmarks: [ID!]!
  }

  type PaginatedPosts {
    posts: [Post!]!
    page: Int!
    hasMore: Boolean!
    lastDate: Date
  }

  extend type Query {
    allPosts(
      nPage: Int
      before: String
    ): PaginatedPosts!
    allFollowingUserPost: [Post!]!
    post(
      postId: ID!
    ): Post!
    userPosts(
      slug: String!
    ): [Post!]!
    userLikes(
      slug: String!
    ): [Post!]!
    userBookmarks(
      slug: String!
    ): [Post!]!
    comments(
      postId: ID!
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

    sharePost(
      postId: ID!
    ): ID!

    unsharePost(
      postId: ID!
    ): ID!

    bookmarkPost(
      postId: ID!
    ): ID!

    unbookmarkPost(
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