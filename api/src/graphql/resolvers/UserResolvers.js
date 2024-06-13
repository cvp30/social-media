import bcrypt from "bcrypt"
import User from "../../models/User.js"
import Followship from "../../models/Followship.js";
import { generateToken } from "../../utils/generateToken.js";
import { generateSlug } from "../../utils/generateSlug.js"

export const UserResolvers = {
  Query: {
    user: async (_, { slug }, context) => {
      if (!context.currentUser) throw new Error('Not Authenticated')
      try {
        const user = await User.findOne({ slug })

        if (!user) throw new Error("Account doesn't exist!")
        return user
      } catch (error) {
        throw new Error(error.message)
      }
    },
    allUsers: async (_, __, context) => {
      if (!context.currentUser) throw new Error('Not Authenticated')
      try {
        const userId = context.currentUser.id

        return await User.find({
          _id: { $ne: userId }
        })
      } catch (error) {
        throw new Error(error.message)
      }
    },

    userProfile: async (_, __, context) => {
      if (!context.currentUser) throw new Error('Not Authenticated')

      try {
        const user = context.currentUser

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
    randomUser: async (_, __, context) => {
      if (!context.currentUser) throw new Error('Not Authenticated')
      try {
        const randomUsersSize = 1
        const userId = context.currentUser.id

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

        if (!match) throw new Error("Incorrect password!")

        const token = generateToken(userFound)

        return {
          user: {
            id: userFound._id,
            email: userFound.email,
            username: userFound.username,
            slug: userFound.slug,
            photoURL: userFound.photoURL,
            state: userFound.state,
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

        const res = await newUser.save()

        const token = generateToken(res)

        return {
          user: {
            id: res._id,
            email: res.email,
            username: res.username,
            slug: res.slug,
            photoURL: res.photoURL,
            state: res.state,
          },
          token,
        }
      } catch (error) {
        throw new Error(error.message)
      }

    },
    registerUser: async (_, { userInputData }) => {
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