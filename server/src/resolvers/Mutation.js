const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET } = require('../utils')

// Links 

const postLink = async (_, { url, description }, context) => {
    const { userId } = context

    console.log(userId)
    const newLink = await context.prisma.link.create({
        data: {
            url,
            description,
            postedBy: { connect: { id: userId } }
        },
    })

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
    // 1
    const password = await bcrypt.hash(args.password, 10)

    // 2
    const user = await context.prisma.user.create({ data: { ...args, password } })

    // 3
    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    // 4
    return {
        token,
        user,
    }
}

const login = async (_, { email, password }, context) => {
    // 1
    const user = await context.prisma.user.findUnique({ where: { email } })
    if (!user) {
        throw new Error('No such user found')
    }

    // 2
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    // 3
    return {
        token,
        user,
    }
}


module.exports = {
    postLink,
    updateLink,
    deleteLink,
    signup,
    login
}