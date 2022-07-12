const links = (parent, _, context) => {
    return context.prisma.user.findUnique({ where: { id: parent.id }, include: { links: true } }).links()
}

module.exports = {
    links,
}