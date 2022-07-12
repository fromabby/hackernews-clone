const getLinksToRender = (isNewPage, data) => {
    if (isNewPage) {
        return data.allLinks.links
    }
    const rankedLinks = data.allLinks.links.slice()
    rankedLinks.sort(
        (l1, l2) => l2.votes.length - l1.votes.length
    )
    return rankedLinks
}

export default getLinksToRender