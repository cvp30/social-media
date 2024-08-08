import mongoose from "mongoose"
import { Chat, Message } from "../../models/Chat.js"
import { PubSub } from "graphql-subscriptions"

const pubsub = new PubSub()

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

          const generalChatInfo = {
            id: chat.id,
            user: chat.users[0]._id.toString() === userId ? chat.users[1] : chat.users[0]
          }


          // AT LEAST ONE MESSAGE
          if (chat.messages.length) {

            generalChatInfo.unreadMessages = chat.messages.reduce((acc, msg) => acc + (!msg.isRead && msg.sender._id.toString() !== userId.toString() ? 1 : 0), 0)

            const lastIdx = chat.messages.length - 1

            generalChatInfo.lastMessage = {
              id: chat.messages[lastIdx].id,
              content: chat.messages[lastIdx].content,
              sender: chat.messages[lastIdx].sender,
              timestamp: chat.messages[lastIdx].timestamp,
            }
          }

          return generalChatInfo

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

        return {
          id: chatFound._id,
          user: chatFound.users[0]._id.toString() === userId ? chatFound.users[1] : chatFound.users[0],
          messages: chatFound.messages,
        }
      } catch (error) {
        throw new Error(error.message)
      }
    }
  },

  Mutation: {
    newChat: async (_, { user }, { currentUser }) => {
      if (!currentUser) throw new Error('User Not Authenticated')

      try {
        // GET THE ID OF THE LOGGED USER
        const userId = currentUser.id

        if (!user) throw new Error('At least one user!')

        // if (users.length > 1 && !groupName) throw new Error('need group name!')

        const chatFound = await Chat.findOne({
          users: {
            $all: [user]
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

        if (chatFound) {

          const generalChatInfo = {
            id: chatFound._id,
            user: chatFound.users[0]._id.toString() === userId ? chatFound.users[1] : chatFound.users[0],
          }

          if (chatFound.messages.length) {
            generalChatInfo.unreadMessages = chatFound.messages.reduce((acc, msg) => acc + (!msg.isRead && msg.sender._id.toString() !== userId.toString() ? 1 : 0), 0)

            const lastIdx = chatFound.messages.length - 1

            generalChatInfo.lastMessage = {
              id: chatFound.messages[lastIdx]._id,
              content: chatFound.messages[lastIdx].content,
              sender: chatFound.messages[lastIdx].sender,
              timestamp: chatFound.messages[lastIdx].timestamp,
            }
          }
          return generalChatInfo

        }

        const newChat = await Chat.create({
          users: [user, userId],
          messages: []
        })

        await newChat.populate('users')

        return {
          id: newChat._id,
          user: newChat.users[0]._id.toString() === userId ? newChat.users[1] : newChat.users[0],
        }


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

    newMessage: async (_, { chatId, message }, { currentUser }) => {
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

    deleteMessage: async (_, { messageId }, { currentUser }) => {
      if (!currentUser) throw new Error("User Not Authenticated!")

      try {
        const deletedMsg = await Message.findByIdAndDelete(messageId)
        if (!deletedMsg) throw new Error("Message Not exist!")

        const chatId = deletedMsg.chat

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
      subscribe: (_, { chatId }) => pubsub.asyncIterator([`MESSAGE_ADDED_${chatId}`])
    },
    messageRemoved: {
      subscribe: (_, { chatId }) => pubsub.asyncIterator([`MESSAGE_REMOVED_${chatId}`])
    }
  }
}