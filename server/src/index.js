const { ApolloServer } = require('apollo-server');

const fs = require('fs');
const path = require('path');

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        findLink: (_, { id }) => links.filter(x => x.id === id)[0],
    },
    Mutation: {
        postLink: (_, args) => {
            let idCount = links.length

            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        updateLink: (_, args) => {
            const { id, description, url } = args

            try {
                // find id index
                const idx = links.findIndex(x => x.id === id)

                if (idx !== undefined) {
                    // remove link
                    links.splice(idx, 1)

                    // add link
                    const link = {
                        id,
                        description,
                        url
                    }

                    links.push(link)

                    return link
                } else {
                    throw new Error('Link does not exist')
                }
            } catch (error) {
                return error
            }
        },
        deleteLink: (_, { id }) => {
            try {
                // find id index
                const idx = links.findIndex(x => x.id === id)

                if (idx !== undefined) {
                    links.splice(idx, 1)
                    return { id }
                } else {
                    throw new Error('Link does not exist')
                }
            } catch (error) {
                return error
            }
        }
    },
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
})

server
    .listen()
    .then(({ url }) =>
        console.log(`Server is running on ${url}`)
    );