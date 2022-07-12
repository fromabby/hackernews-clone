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
        id: `main-feed:${JSON.stringify(args)}`,
        links,
        count,
    }
}

const findLink = async (_, args, context) => {
    const { id } = args
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