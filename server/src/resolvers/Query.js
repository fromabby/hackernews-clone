const info = () => `This is the API of a Hackernews Clone`

const allLinks = async (_, __, context) => {
    const links = await context.prisma.link.findMany()

    return links
}

const findLink = async (_, { id }, context) => {
    const link = await context.prisma.link.findUnique({
        where: {
            id
        }
    })

    return link
}

module.exports = {
    info,
    allLinks,
    findLink
}