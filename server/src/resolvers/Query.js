const allLinks = async (_, args, context) => {
    const { filter, skip, take, orderBy } = args
    const where = filter
        ? {
            OR: [
                { description: { contains: filter } },
                { url: { contains: filter } },
            ],
        }
        : {}

    const links = await context.prisma.link.findMany({
        where,
        skip,
        take,
        orderBy
    })

    const count = await context.prisma.link.count({ where })

    return {
        links,
        count,
    }
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
    allLinks,
    findLink
}