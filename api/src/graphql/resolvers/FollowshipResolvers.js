import Followship from "../../models/Followship.js";
import User from "../../models/User.js";

export const FollowshipResolvers = {
  Query: {
    followers: async (_, __, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated')

      try {
        const userId = currentUser.id

        const followersList = await Followship.find({
          following: userId
        })
          .select('follower')
          .populate('follower')

        return followersList.map(followship => followship.follower)

      } catch (error) {
        throw new Error(error.message)
      }
    },
    following: async (_, __, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated')

      try {
        const userId = currentUser.id

        const followingList = await Followship.find({
          follower: userId
        })
          .select('following')
          .populate('following')

        return followingList.map(followship => followship.following)

      } catch (error) {
        throw new Error(error.message)
      }
    },
    otherUsers: async (_, __, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated')

      try {
        const userId = currentUser.id

        const allFollowship = await Followship.find({
          follower: userId
        })

        const arrIds = allFollowship.map(item => item.following.toString())

        return await User.find({
          _id: {
            $nin: [...arrIds, userId]
          }
        })
      } catch (error) {
        throw new Error(error.message)
      }
    }
  },

  Mutation: {
    followUser: async (_, { followUserId }, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated')

      try {
        const userId = currentUser.id

        const userFollowingExist = await User.findById(followUserId)

        if (!userFollowingExist) throw new Error('User Id does not exist!')

        const followItem = await Followship.findOne({
          $and: [
            { follower: userId },
            { following: followUserId }
          ]
        })

        if (followItem) throw new Error("You already follow this user!")

        await Followship.create({
          follower: userId,
          following: followUserId
        })

        return userFollowingExist._id

      } catch (error) {
        throw new Error(error.message)
      }
    },
    unfollowUser: async (_, { unfollowUserId }, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Not Authenticated')

      try {
        const userId = currentUser.id

        const removeFollow = await Followship.findOneAndDelete({
          $and: [
            { follower: userId },
            { following: unfollowUserId }
          ]
        })
          .select('following')
          .populate('following')

        if (!removeFollow) throw new Error("You already unfollow this user!")

        return removeFollow.following._id

      } catch (error) {
        throw new Error(error.message)
      }
    }
  }
}