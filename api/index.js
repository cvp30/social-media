import 'dotenv/config'
import cors from 'cors';
import express from "express"
import jwt from "jsonwebtoken"
import { createServer } from "http"
import { WebSocketServer } from "ws";
import { ApolloServer } from "@apollo/server";
import { useServer } from 'graphql-ws/lib/use/ws';
import { expressMiddleware } from "@apollo/server/express4"
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import "./src/database.js";
import User from "./src/models/User.js";
import { typeDefs, resolvers } from "./src/graphql/index.js";
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub()

const { JWT_SECRET, PORT } = process.env

const schema = makeExecutableSchema({ typeDefs, resolvers })

const app = express()
const httpServer = createServer(app)

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
})

const serverCleanup = useServer({ schema }, wsServer)

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose()
          }
        }
      }
    }
  ],
  formatError: error => {
    const message = error.message
    return {
      message,
      code: error.extensions.code,
      path: error.path,
    };
  }
})

await server.start()

app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const auth = req.headers.authorization || ''

      if (auth.length) {
        try {
          const { id, email, exp } = jwt.verify(auth, JWT_SECRET)
          if (Date.now() >= exp * 1000) throw new Error("Expired token!")

          const currentUser = await User.findById(id)

          if (!currentUser || email !== currentUser?.email) throw new Error('Invalid token!')

          return {
            currentUser,
            pubsub,
          }

        } catch (error) {
          throw new Error("Invalid or expired token")
        }
      }
    }
  }),
)

httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`)
})