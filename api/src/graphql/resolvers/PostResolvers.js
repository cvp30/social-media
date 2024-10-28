import Post from "../../models/Post.js"
import User from "../../models/User.js"
import Followship from "../../models/Followship.js"
import { POST_ADDED } from "../../utils/subscriptionEvents.js"

export const PostResolvers = {
  Query: {
    allPosts: async (_, { nPage, before }, { currentUser }) => {
      if (!currentUser) throw new Error('Not Authenticated')

      try {
        const DOCS_PER_PAGE = 5
        const query = {
          parentPostId: null
        }

        if (before) query.createdAt = { $lt: new Date(before) }

        const allPosts = await Post.paginate(
          query,
          {
            populate: 'author',
            sort: { createdAt: -1 },
            limit: DOCS_PER_PAGE,
            page: nPage || 1
          }
        )

        const { docs, page, hasNextPage } = allPosts

        const lastDate = docs.length > 0 ? docs[docs.length - 1].createdAt : null

        return {
          posts: docs,
          page,
          hasMore: hasNextPage,
          lastDate
        }

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
          "author": user.id,
          "parentPostId": null
        })
          .populate("author")
          .sort({ createdAt: -1 })
      } catch (error) {
        throw new Error(error.message)
      }

    },
    userLikes: async (_, { slug }, { currentUser }) => {
      if (!currentUser) throw new Error('Not Authenticated')

      try {
        const user = await User.findOne({ slug })

        if (!user) throw new Error("Account doesn't exist!")

        return await Post.find({
          "likes": user.id
        })
          .populate("author")
          .sort({ createdAt: -1 })
      } catch (error) {
        throw new Error(error.message)
      }

    },
    userBookmarks: async (_, { slug }, { currentUser }) => {
      if (!currentUser) throw new Error('Not Authenticated')

      try {
        const user = await User.findOne({ slug })

        if (!user) throw new Error("Account doesn't exist!")

        return await Post.find({
          "bookmarks": user.id
        })
          .populate("author")
          .sort({ createdAt: -1 })
      } catch (error) {
        throw new Error(error.message)
      }

    },
    comments: async (_, { postId }, { currentUser }) => {
      if (!currentUser) throw new Error('Not Authenticated')

      try {

        return await Post.find({ parentPostId: postId })
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

      if (!content && !images?.length) throw new Error("must be at least one field: content or image!")
      try {
        const author = currentUser.id

        const createNewPost = async (additionalField = {}) => {
          const newPost = await Post.create({
            author,
            content,
            images,
            ...additionalField
          })

          await newPost
            .populate('author')

          pubsub.publish(POST_ADDED, { postAdded: newPost })

          return newPost
        }

        if (parentPostId) {
          const parentPost = await Post.findById(parentPostId)

          if (!parentPost) throw new Error("Post not Found!")

          const newPost = await createNewPost({ parentPostId })
          parentPost.comments.push(newPost._id)

          await parentPost.save()

          return newPost
        }

        return await createNewPost()

      } catch (error) {
        throw new Error(error.message)
      }
    },
    deletePost: async (_, { postId }, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated')

      try {
        const deletedPost = await Post.findByIdAndDelete(postId)

        if (!deletedPost) throw new Error("Post not Found!")

        const parentPostId = deletedPost.parentPostId

        if (parentPostId) {
          const parentPost = await Post.findByIdAndUpdate(
            parentPostId,
            {
              $pull: { comments: parentPostId }
            },
            { new: true }
          )
        }

        return postId

      } catch (error) {
        throw new Error(error.message)
      }
    },
    sharePost: async (_, { postId }, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated')

      try {
        const userId = currentUser.id

        const postUpdated = await Post.findByIdAndUpdate(
          postId,
          {
            $addToSet: { shares: userId }
          },
          { new: true }
        )

        if (!postUpdated) throw new Error("Post not Found!")

        return postId

      } catch (error) {
        throw new Error(error.message)
      }
    },
    unsharePost: async (_, { postId }, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated')

      try {
        const userId = currentUser.id

        const postUpdated = await Post.findByIdAndUpdate(
          postId,
          {
            $pull: { shares: userId }
          },
          { new: true }
        )

        if (!postUpdated) throw new Error("Post not Found!")

        return postId

      } catch (error) {
        throw new Error(error.message)
      }
    },
    bookmarkPost: async (_, { postId }, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated')

      try {
        const userId = currentUser.id

        const postUpdated = await Post.findByIdAndUpdate(
          postId,
          {
            $addToSet: { bookmarks: userId }
          },
          { new: true }
        )

        if (!postUpdated) throw new Error("Post not Found!")

        return postId

      } catch (error) {
        throw new Error(error.message)
      }
    },
    unbookmarkPost: async (_, { postId }, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated')

      try {
        const userId = currentUser.id

        const postUpdated = await Post.findByIdAndUpdate(
          postId,
          {
            $pull: { bookmarks: userId }
          },
          { new: true }
        )

        if (!postUpdated) throw new Error("Post not Found!")

        return postId

      } catch (error) {
        throw new Error(error.message)
      }
    },
    addLike: async (_, { postId }, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated')

      try {
        const userId = currentUser.id

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