const postedBy = async (parent, _, context) => {
    return await context.prisma.link.findUnique({ where: { id: parent.id } }).postedBy()
}

module.exports = {
    postedBy,
}