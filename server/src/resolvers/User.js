const links = async (parent, _, context) => {
    return await context.prisma.user.findUnique({ where: { id: parent.id } }).links()
}

module.exports = {
    links,
}