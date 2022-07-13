import { LINKS_PER_PAGE } from '../constants'

/**
 * @param {Boolean} isNewPage - whether 'new' is found in URL 
 * @param {int} page - Page number found in URL /new/${page}
 * @returns {Object} query useQuery variables: { take, skip, orderBy } 
 */
const getQueryVariables = (isNewPage, page) => {
    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0
    const take = isNewPage ? LINKS_PER_PAGE : 100
    const orderBy = { createdAt: 'desc' }

    return { take, skip, orderBy }
}

export default getQueryVariables