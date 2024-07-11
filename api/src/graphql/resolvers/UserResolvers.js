import bcrypt from "bcrypt"
import User from "../../models/User.js"
import Followship from "../../models/Followship.js";
import { generateToken } from "../../utils/generateToken.js";
import { generateSlug } from "../../utils/generateSlug.js"

export const UserResolvers = {
  Query: {
    user: async (_, { slug }, { currentUser }) => {
      if (!currentUser) throw new Error('Not Authenticated')
      try {
        const user = await User.findOne({ slug })

        if (!user) throw new Error("Account doesn't exist!")
        return user
      } catch (error) {
        throw new Error(error.message)
      }
    },
    allUsers: async (_, __, { currentUser }) => {
      if (!currentUser) throw new Error('Not Authenticated')
      try {
        const userId = currentUser.id

        return await User.find({
          _id: { $ne: userId }
        })
      } catch (error) {
        throw new Error(error.message)
      }
    },
    searchUsers: async (_, { user }, { currentUser }) => {
      if (!currentUser) throw new Error('Not Authenticated')

      try {
        const userId = currentUser.id

        return await User.find({
          _id: { $ne: userId },
          $or: [
            {
              username: { $regex: user, $options: 'i' }
            },
            {
              slug: { $regex: user, $options: 'i' }
            }
          ]
        })
      } catch (error) {
        throw new Error(error.message)
      }
    },
    communityUsers: async (_, __, { currentUser }) => {
      if (!currentUser) throw new Error('Not Authenticated')
      try {
        const userId = currentUser.id

        const followingQuery = await Followship.find({
          follower: userId
        })
          .select('following')

        const followingList = followingQuery.map(user => user.following)

        return await User.find({
          _id: { $nin: [...followingList, userId] }
        })
      } catch (error) {
        throw new Error(error.message)
      }
    },
    userProfile: async (_, __, { currentUser }) => {
      if (!currentUser) throw new Error('Not Authenticated')

      try {
        const user = currentUser

        const followingQuery = await Followship.find({
          follower: user.id
        })
          .select('following')

        const followingList = followingQuery.map(user => user.following)

        return {
          user,
          followingList
        }
      } catch (error) {
        throw new Error(error.message)
      }

    },
    randomUser: async (_, __, { currentUser }) => {
      if (!currentUser) throw new Error('Not Authenticated')
      try {
        const randomUsersSize = 1
        const userId = currentUser.id

        const randomUsers = await User.aggregate([
          {
            $match: {
              _id: {
                $ne: userId
              }
            }
          },
          {
            $sample: {
              size: randomUsersSize
            }
          }
        ])

        return randomUsers.map(user => {
          const { _id, ...dataUser } = user

          return {
            id: _id,
            ...dataUser
          }
        })[0]

      } catch (error) {
        throw new Error(error.message)
      }
    },
  },

  Mutation: {
    loginUser: async (_, { email, password }) => {

      try {
        const userFound = await User.findOne({ email })

        if (!userFound) throw new Error("Account doesn't exist!")

        const match = await bcrypt.compare(password, userFound.password)

        const followingQuery = await Followship.find({
          follower: userFound.id
        })
          .select('following')

        const followingList = followingQuery.map(user => user.following)

        if (!match) throw new Error("Incorrect password!")

        const token = generateToken(userFound)

        return {
          userInfo: {
            user: userFound,
            followingList
          },
          token,
        }
      } catch (error) {
        throw new Error(error.message)
      }

    },
    registerUser: async (_, { email, username, password }) => {
      try {
        const userFound = await User.findOne({ email })

        if (userFound) throw new Error("User already exist!")

        const encryptedPassword = await bcrypt.hash(password, 10)

        const [initialSlug,] = email.split('@');
        const slug = await generateSlug(initialSlug, User)

        const newUser = new User({
          email,
          username,
          password: encryptedPassword,
          slug
        })

        await newUser.save()

        const token = generateToken(newUser)

        return {
          userInfo: {
            user: newUser,
            followingList: [],
          },
          token,
        }
      } catch (error) {
        throw new Error(error.message)
      }

    },
    updateUser: async (_, { userInputData }) => {
      if (!context.currentUser) throw new Error('Not Authenticated')

      try {
        const userId = context.currentUser.id

        return await User.findOneAndUpdate(
          {
            _id: userId
          },
          {
            $set: userInputData
          },
          {
            new: true
          }
        )
      } catch (error) {
        throw new Error(error.message)
      }
    },

  }
}