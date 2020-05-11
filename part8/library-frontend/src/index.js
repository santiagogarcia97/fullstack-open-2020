import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import {
  ApolloClient, ApolloProvider, InMemoryCache
} from '@apollo/client'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('libraryUserToken')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)