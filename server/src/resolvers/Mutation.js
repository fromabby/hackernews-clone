const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET } = require('../utils')

// Links 
const postLink = async (_, { url, description }, context) => {
    const { userId } = context

    const newLink = await context.prisma.link.create({
        data: {
            url,
            description,
            postedBy: { connect: { id: userId } }
        },
    })

    // subscription event
    context.pubsub.publish("NEW_LINK", newLink)

    return newLink
}

const updateLink = async (_, { id, description, url }, context) => {
    try {
        const link = await context.prisma.link.update({
            where: {
                id: Number(id)
            },
            data: {
                description,
                url
            }
        })

        return link
    } catch (error) {
        return error
    }
}

const deleteLink = async (_, { id }, context) => {
    try {
        const link = await context.prisma.link.delete({
            where: {
                id: Number(id)
            }
        })

        return link
    } catch (error) {
        return error
    }
}

// Authentication
const signup = async (_, args, context) => {
    const password = await bcrypt.hash(args.password, 10)

    const user = await context.prisma.user.create({ data: { ...args, password } })

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}

const login = async (_, { email, password }, context) => {
    const user = await context.prisma.user.findUnique({ where: { email } })
    if (!user) {
        throw new Error('No such user found')
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}

// Voting
const vote = async (_, args, context) => {
    // 1
    const { userId } = context
    const { linkId } = args

    console.log(userId, linkId)
    // 2
    const vote = await context.prisma.vote.findUnique({
        where: {
            linkId_userId: {
                linkId: Number(linkId),
                userId
            }
        }
    })

    if (Boolean(vote)) {
        throw new Error(`Already voted for link: ${linkId}`)
    }

    // 3
    const newVote = context.prisma.vote.create({
        data: {
            user: { connect: { id: userId } },
            link: { connect: { id: Number(linkId) } },
        }
    })
    context.pubsub.publish("NEW_VOTE", newVote)

    return newVote
}

module.exports = {
    postLink,
    updateLink,
    deleteLink,
    signup,
    login,
    vote
}