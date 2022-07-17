const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET } = require('../utils')

// Links 
const postLink = async (_, args, context) => {
    try {
        const { url, description } = args
        const { userId } = context

        let postedBy = userId ? {
            connect: { id: userId }
        } : undefined

        const newLink = await context.prisma.link.create({
            data: {
                url,
                description,
                postedBy
            },
        })

        context.pubsub.publish("NEW_LINK", newLink)

        return newLink
    } catch (error) {
        return error
    }
}

const updateLink = async (_, args, context) => {
    try {
        const { id, description, url } = args

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

const deleteLink = async (_, args, context) => {
    try {
        const { id } = args
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

const login = async (_, args, context) => {
    const { email, password } = args
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
    const { userId } = context
    const { linkId } = args
    const where = {
        linkId_userId: {
            linkId: Number(linkId),
            userId
        }
    }

    const vote = await context.prisma.vote.findUnique({ where })

    let newVote

    if (Boolean(vote)) {
        // throw new Error(`Already voted for link: ${linkId}`)
        // Dislike (Delete vote)
        newVote = await context.prisma.vote.delete({ where })

        context.pubsub.publish("DELETE_VOTE", newVote)
    } else {
        newVote = await context.prisma.vote.create({
            data: {
                user: { connect: { id: userId } },
                link: { connect: { id: Number(linkId) } },
            }
        })

        // not sure how to subscribe this
        context.pubsub.publish("NEW_VOTE", newVote)
    }

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