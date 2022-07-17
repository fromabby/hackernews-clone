const user = (parent, _, context) => {
    return context.prisma.comment.findUnique({
        where: {
            id: parent.id
        }
    }).user()
}

const link = (parent, _, context) => {
    return context.prisma.comment.findUnique({
        where: {
            id: parent.id
        }
    }).link()
}

module.exports = {
    user,
    link
}