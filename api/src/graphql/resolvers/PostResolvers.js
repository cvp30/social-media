import Post from "../../models/Post.js"
import User from "../../models/User.js"
import Followship from "../../models/Followship.js"
import { POST_ADDED } from "../../utils/subscriptionEvents.js"

export const PostResolvers = {
  Query: {
    allPosts: async (_, __, { currentUser }) => {
      if (!currentUser) throw new Error('Not Authenticated')

      try {
        return await Post.find({
          parentPostId: null
        })
          .populate("author")
          .sort({ createdAt: -1 })
      } catch (error) {
        throw new Error(error.message)
      }
    },
    allFollowingUserPost: async (_, __, { currentUser }) => {
      if (!currentUser) throw new Error('Not Authenticated')

      try {
        const userId = currentUser.id

        const followingQuery = await Followship.find({
          follower: userId
        })
          .select('following')

        const followingList = followingQuery.map(user => user.following)

        return await Post.find({
          $and: [
            { parentPostId: null },
            { author: { $in: followingList } }
          ],
        })
          .populate("author")
          .sort({ createdAt: -1 })
      } catch (error) {
        throw new Error(error.message)
      }
    },
    post: async (_, { postId }, { currentUser }) => {
      if (!currentUser) throw new Error('Not Authenticated')

      try {
        return await Post.findById(postId)
          .populate("author")
      } catch (error) {
        throw new Error(error.message)
      }
    },
    userPosts: async (_, { slug }, { currentUser }) => {
      if (!currentUser) throw new Error('Not Authenticated')

      try {
        const user = await User.findOne({ slug })

        if (!user) throw new Error("Account doesn't exist!")

        return await Post.find({
          "author": user.id
        })
          .populate("author")
          .sort({ createdAt: -1 })
      } catch (error) {
        throw new Error(error.message)
      }

    },
    comments: async (_, { parentPostId }, { currentUser }) => {
      if (!currentUser) throw new Error('Not Authenticated')

      try {
        return await Post.find({ parentPostId })
          .populate("author")
          .sort({ createdAt: -1 })
      } catch (error) {
        throw new Error(error.message)
      }
    },
  },

  Mutation: {
    createPost: async (_, { parentPostId, content, images }, { currentUser, pubsub }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated')

      try {
        if (!content && !images?.length) throw new Error("must be at least one field: content or image!")

        const author = currentUser.id

        const newPost = await Post.create({
          author,
          content,
          images,
          ...(parentPostId && { parentPostId })
        })
        await newPost.populate('author')

        pubsub.publish(POST_ADDED, { postAdded: newPost })

        return newPost

      } catch (error) {
        throw new Error(error.message)
      }
    },
    deletePost: async (_, { postId }, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated')

      try {
        console.log(postId)
        const postDeleted = await Post.deleteOne({ _id: postId })

        if (!postDeleted.deletedCount) throw new Error("Post not Found!")

        return postId

      } catch (error) {
        throw new Error(error.message)
      }
    },
    addLike: async (_, { postId }, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated')

      try {
        const userId = context.currentUser.id

        const postUpdated = await Post.findByIdAndUpdate(
          postId,
          {
            $addToSet: { likes: userId }
          },
          { new: true }
        )

        if (!postUpdated) throw new Error("Post not Found!")

        return postId

      } catch (error) {
        throw new Error(error.message)
      }
    },
    removeLike: async (_, { postId }, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated')

      try {
        const userId = currentUser.id

        const postUpdated = await Post.findByIdAndUpdate(
          postId,
          {
            $pull: { likes: userId }
          },
          { new: true }
        )

        if (!postUpdated) throw new Error("Post not Found!")

        return postId

      } catch (error) {
        throw new Error(error.message)
      }
    }
  },

  Subscription: {
    postAdded: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(POST_ADDED)
    },
  }
}