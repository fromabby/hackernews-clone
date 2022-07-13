/**
 * 
 * @param {Boolean} isNewPage - whether 'new' is found in URL
 * @param {Object} data - useQuery response
 * @param {Object} data.allLinks - query response
 * @returns {Object} ranked list object
 */

const getLinksToRender = (isNewPage, { allLinks }) => {
    if (isNewPage) {
        return allLinks.links
    }

    const rankedLinks = allLinks.links.slice()
    rankedLinks.sort(
        (l1, l2) => l2.votes.length - l1.votes.length
    )

    return rankedLinks
}

export default getLinksToRender