import 'styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'components/App'
import { reportWebVitals } from 'utils'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { AUTH_TOKEN } from 'constants'

import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
        reconnect: true,
        connectionParams: {
            authToken: localStorage.getItem(AUTH_TOKEN)
        }
    }
})

const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN)

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const isSubscription = ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return (kind === 'OperationDefinition' && operation === 'subscription')
}

/**
 * split is used to “route” a request to a specific middleware link. It takes three arguments,
 * the first one is a test function which returns a boolean.
 * The remaining two arguments are again of type ApolloLink.
 * If test returns true, the request will be forwarded to the link passed as the second argument.
 * If false, to the third one.
 */
const link = split(isSubscription, wsLink, authLink.concat(httpLink))

const cache = new InMemoryCache()

const client = new ApolloClient({ link, cache })

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </BrowserRouter>
)

reportWebVitals()