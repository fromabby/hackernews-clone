const postedBy = (parent, _, context) => {
    return context.prisma.link.findUnique({
        where: {
            id: parent.id
        }
    }).postedBy()
}

const votes = (parent, _, context) => {
    return context.prisma.link.findUnique({
        where: {
            id: parent.id
        }
    }).votes()
}

const comments = (parent, _, context) => {
    return context.prisma.link.findUnique({
        where: {
            id: parent.id
        }
    }).comments()
}

module.exports = {
    postedBy,
    votes,
    comments
}