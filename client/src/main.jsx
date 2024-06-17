import ReactDOM from 'react-dom/client'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'


const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const sessionToken = localStorage.getItem('Session');

  return {
    headers: {
      ...headers,
      authorization: sessionToken ? sessionToken : "",
    }
  }
})

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:5000/graphql',
}))

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </NextUIProvider>,
)
