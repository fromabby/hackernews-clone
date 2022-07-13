import Link from './Link'
import { useQuery } from '@apollo/client'
import { useLocation, useNavigate } from 'react-router-dom'
import { ALL_LINKS_QUERY } from '../../gql/queries'
import { NEW_LINKS_SUBSCRIPTION, NEW_VOTES_SUBSCRIPTION } from '../../gql/subscriptions'
import { getQueryVariables, getLinksToRender } from '../../utils'
import { LINKS_PER_PAGE } from '../../constants'

const LinkList = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const isNewPage = location.pathname.includes('new')
    const pageIndexParams = location.pathname.split('/')
    const page = parseInt(pageIndexParams[pageIndexParams.length - 1])
    const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0

    const { loading, data, error, subscribeToMore } = useQuery(ALL_LINKS_QUERY, {
        variables: getQueryVariables(isNewPage, page),
    })

    subscribeToMore({
        document: NEW_LINKS_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
            const { data } = subscriptionData
            const { allLinks } = prev

            if (!data) return prev

            const newLink = data.newLink
            const exists = allLinks.links.find(
                ({ id }) => id === newLink.id
            )

            if (exists) return prev

            return Object.assign({}, prev, {
                allLinks: {
                    links: [newLink, ...allLinks.links],
                    count: allLinks.links.length + 1,
                    __typename: allLinks.__typename
                }
            })
        }
    })

    subscribeToMore({ document: NEW_VOTES_SUBSCRIPTION })

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
            {data && (
                <>
                    {getLinksToRender(isNewPage, data).map(
                        (link, index) => (
                            <Link
                                key={link.id}
                                link={link}
                                index={index + pageIndex}
                            />
                        )
                    )}
                    {isNewPage && (
                        <div className="flex ml4 mv3 gray">
                            <div
                                className="pointer mr2"
                                onClick={() => {
                                    if (page > 1) {
                                        navigate(`/new/${page - 1}`)
                                    }
                                }}
                            >
                                Previous
                            </div>
                            <div
                                className="pointer"
                                onClick={() => {
                                    if (page <= data.allLinks.count / LINKS_PER_PAGE) {
                                        const nextPage = page + 1
                                        navigate(`/new/${nextPage}`)
                                    }
                                }}
                            >
                                Next
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default LinkList