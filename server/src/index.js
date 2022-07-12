const { ApolloServer, PubSub } = require('apollo-server')
const { PrismaClient } = require('@prisma/client')

const fs = require('fs')
const path = require('path')

const { getUserId } = require('./utils')

const typeDefs = fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
)
const resolvers = require('./resolvers')
const context = ({ req }) => ({
    ...req,
    prisma,
    pubsub,
    userId:
        req && req.headers.authorization
            ? getUserId(req)
            : null
})

const prisma = new PrismaClient()
const pubsub = new PubSub()

const server = new ApolloServer({ typeDefs, resolvers, context })

server
    .listen()
    .then(({ url }) =>
        console.log(`Server is running on ${url}`)
    );