import { useMutation } from '@apollo/client'
import { AUTH_TOKEN } from '../../constants'
import timeDifferenceForDate from '../../utils/timeDifferenceForDate'
import { VOTE_MUTATION } from '../../gql/mutations'
import { ALL_LINKS_QUERY } from '../../gql/queries'

const Link = (props) => {
    const { index, link } = props
    const authToken = localStorage.getItem(AUTH_TOKEN)

    const [vote] = useMutation(VOTE_MUTATION, {
        variables: {
            linkId: link.id
        },
        //CACHING
        update: (cache, { data: { vote } }) => {
            const { allLinks } = cache.readQuery({
                query: ALL_LINKS_QUERY
            });

            const updatedLinks = allLinks.links.map((feedLink) => {
                if (feedLink.id === link.id) {
                    return {
                        ...feedLink,
                        votes: [...feedLink.votes, vote]
                    };
                }
                return feedLink;
            });

            cache.writeQuery({
                query: ALL_LINKS_QUERY,
                data: {
                    allLinks: {
                        links: updatedLinks
                    }
                }
            });
        }
    })

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
                {(
                    <div className="f6 lh-copy gray">
                        {link.votes ? link.votes?.length : 0} votes | by{' '}
                        {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
                        {timeDifferenceForDate(link.createdAt)}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Link
