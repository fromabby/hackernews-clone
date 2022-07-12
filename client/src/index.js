import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import App from './components/App'
import reportWebVitals from './utils/reportWebVitals'

import {
    ApolloProvider,
    ApolloClient,
    createHttpLink,
    InMemoryCache
} from '@apollo/client'

const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>
)

reportWebVitals()
