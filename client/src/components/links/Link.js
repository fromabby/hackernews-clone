import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { Link as RouteLink } from 'react-router-dom'

import { AUTH_TOKEN, LINKS_PER_PAGE } from 'constants'
import { timeDifferenceForDate } from 'utils'
import { VOTE_MUTATION, DELETE_LINK_MUTATION } from 'gql/mutations'
import { ALL_LINKS_QUERY } from 'gql/queries'

const Link = (props) => {
    const { index, link } = props
    const authToken = localStorage.getItem(AUTH_TOKEN)

    const [loggedInUser, setLoggedInUser] = useState(0)

    useEffect(() => {
        if (localStorage.getItem('User') !== null) {
            setLoggedInUser(JSON.parse(localStorage.getItem('User')).id)
        }
    }, [])

    const take = LINKS_PER_PAGE
    const skip = 0
    const orderBy = { createdAt: 'desc' }

    const [deleteLink] = useMutation(DELETE_LINK_MUTATION, {
        variables: {
            id: link.id
        },
        update: (cache, { data: { deleteLink } }) => {
            const { allLinks } = cache.readQuery({
                query: ALL_LINKS_QUERY,
                variables: {
                    take,
                    skip,
                    orderBy
                }
            })

            const updatedLinks = allLinks.links.filter((feedLink) => (feedLink.id !== deleteLink.id))

            cache.writeQuery({
                query: ALL_LINKS_QUERY,
                data: {
                    allLinks: {
                        links: updatedLinks
                    }
                },
                variables: {
                    take,
                    skip,
                    orderBy
                }
            })

        }
    })

    const [vote] = useMutation(VOTE_MUTATION, {
        variables: {
            linkId: link.id
        },
        onError: (error) => {
            console.log(error)
        },
        update: (cache, { data: { vote } }) => {
            const { allLinks } = cache.readQuery({
                query: ALL_LINKS_QUERY,
                variables: {
                    take,
                    skip,
                    orderBy
                }
            })
            const updatedLinks = allLinks.links.map((feedLink) => {
                if (feedLink.id === link.id) {
                    return {
                        ...feedLink,
                        votes: [...feedLink.votes, vote]
                    }
                }
                return feedLink
            })

            cache.writeQuery({
                query: ALL_LINKS_QUERY,
                data: {
                    allLinks: {
                        links: updatedLinks
                    }
                },
                variables: {
                    take,
                    skip,
                    orderBy
                }
            })
        }
    })

    const { id } = link.postedBy ? link.postedBy : ''

    return (
        <div className="flex mt2 items-start">
            <div className="flex items-center">
                <span className="gray">{index + 1}.</span>
                {authToken && (
                    <div
                        className="ml1 gray f11"
                        style={{ cursor: 'pointer' }}
                        onClick={vote}
                    >
                        ▲
                    </div>
                )}
            </div>
            <div className="ml1">
                <div>
                    {link.description} ({link.url})
                </div>
                <div className="f6 lh-copy gray">
                    {link.votes ? link.votes?.length : 0} votes | by{' '}
                    {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
                    {timeDifferenceForDate(link.createdAt)}
                </div>
                {authToken && id === loggedInUser && (
                    <>
                        <RouteLink to={`/link/${link.id}`}>
                            Update
                        </RouteLink>
                        <button onClick={deleteLink}>Delete</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Link
