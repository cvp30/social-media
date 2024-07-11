import mongoose from "mongoose"
import { Chat, Message } from "../../models/Chat.js"

export const ChatResolvers = {
  Query: {
    allChats: async (_, __, { currentUser }) => {
      if (!currentUser) throw new Error("User Not Authenticated")

      try {
        const userId = currentUser.id

        const chatsFound = await Chat.find({
          users: {
            $in: [userId]
          }
        })
          .populate({ path: 'users' })
          .populate({
            path: 'messages',
            populate: {
              path: 'sender',
              model: 'User'
            }
          })

        return chatsFound.map(chat => {
          let generalData = {}

          // AT LEAST ONE MESSAGE
          if (chat.messages.length) {
            const lastIdx = chat.messages.length - 1

            generalData.lastMessage = chat.messages[lastIdx].content
            generalData.messageDate = chat.messages[lastIdx].timestamp
            generalData.isSender = chat.messages[lastIdx].sender._id.toString() === userId.toString()
            generalData.unreadMessages = chat.messages.reduce((acc, msg) => acc + (!msg.isRead && msg.sender._id.toString() !== userId.toString() ? 1 : 0), 0)
          }

          return (
            {
              id: chat.id,
              users: chat.users.filter(user => user._id.toString() !== userId),
              ...generalData
            }
          )
        })

      } catch (error) {
        throw new Error(error.message)
      }
    },

    chat: async (_, { chatId }, { currentUser }) => {
      if (!currentUser) throw new Error("User Not Authenticated!")

      try {
        const userId = currentUser.id
        if (!mongoose.Types.ObjectId.isValid(chatId)) throw new Error("Invalid Id!")

        // FIND CHAT BY ID
        const chatFound = await Chat.findById(chatId)
          .populate('users')
          .populate({
            path: 'messages',
            populate: {
              path: 'sender',
              model: 'User'
            }
          })

        // IF CHAT NOT FOUND
        if (!chatFound) throw new Error('Chat Not Found!')

        chatFound.users = chatFound.users.filter(user => user._id.toString() !== userId)

        return chatFound

      } catch (error) {
        throw new Error(error.message)
      }
    }
  },

  Mutation: {
    newChat: async (_, { users }, { currentUser }) => {
      if (!currentUser) throw new Error('User Not Authenticated')

      try {
        // GET THE ID OF THE LOGGED USER
        const userId = currentUser.id

        if (!users.length) throw new Error('At least one user!')

        const chatFound = await Chat.findOne({
          users: {
            $all: users,
            $size: users.length + 1
          }
        })
          .populate('users')
          .populate({
            path: 'messages',
            populate: {
              path: 'sender',
              model: 'User'
            }
          })

        if (chatFound) return chatFound

        const newChat = await Chat.create({
          users: [...users, userId],
          messages: []
        })

        return newChat.populate('users')


      } catch (error) {
        throw new Error(error.message)
      }
    },

    deleteChat: async (_, { chatId }, { currentUser }) => {
      if (!currentUser) throw new Error("User Not Authenticated!")

      try {

        // FIND AND DELETE CHAT BY ID
        const deletedChat = await Chat.findByIdAndDelete(chatId)

        // IF CHAT NOT FOUND
        if (!deletedChat) throw new Error('Chat Not Exist!')

        const messageIds = deletedChat.messages

        await Message.deleteMany({
          _id: {
            $in: messageIds
          }
        })

        return deletedChat.id

      } catch (error) {
        throw new Error(error.message)
      }
    },

    newMessage: async (_, { chatId, message }, { currentUser, pubsub }) => {
      if (!currentUser) throw new Error("User Not Authenticated!")

      try {
        const chatFound = await Chat.findById(chatId)

        // IF CANT FIND THE CHAT
        if (!chatFound) throw new Error('Chat Not Found!')

        // GET THE ID OF THE LOGGED USER
        const userId = currentUser.id

        // CREATE MSG AND PUSH INTO MESSAGES FIELD 
        const newMessage = await Message.create({
          sender: userId,
          chat: chatId,
          content: message
        })
        chatFound.messages.push(newMessage._id)

        // SAVE THE CHANGES
        await chatFound.save()

        pubsub.publish(`MESSAGE_ADDED_${chatId}`, { messageAdded: newMessage.populate('sender') })

        // RETURN CREATED MESSAGE
        return newMessage.populate('sender')

      } catch (error) {
        throw new Error(error.message)
      }
    },

    deleteMessage: async (_, { chatId, messageId }, { currentUser, pubsub }) => {
      if (!currentUser) throw new Error("User Not Authenticated!")

      try {
        const deletedMsg = await Message.findByIdAndDelete(messageId)
        if (!deletedMsg) throw new Error("Message Not exist!")

        const chatFound = await Chat.findByIdAndUpdate(
          chatId,
          {
            $pull: { messages: messageId }
          }
        )
        if (!chatFound) throw new Error("Chat Not Exist!")

        pubsub.publish(`MESSAGE_REMOVED_${chatId}`, { messageRemoved: messageId })

        return messageId

      } catch (error) {
        throw new Error(error.message)
      }
    },
  },

  Subscription: {
    messageAdded: {
      subscribe: (_, { chatId }, { pubsub }) => pubsub.asyncIterator([`MESSAGE_ADDED_${chatId}`])
    },
    messageRemoved: {
      subscribe: (_, { chatId }, { pubsub }) => pubsub.asyncIterator([`MESSAGE_REMOVED_${chatId}`])
    }
  }
}