import Link from './Link'
import { useQuery } from '@apollo/client'
import { ALL_LINKS_QUERY } from '../../gql/queries'
import { NEW_LINKS_SUBSCRIPTION, NEW_VOTES_SUBSCRIPTION } from '../../gql/subscriptions'

const LinkList = () => {
    const { loading, data, error, subscribeToMore } = useQuery(ALL_LINKS_QUERY)

    subscribeToMore({
        document: NEW_LINKS_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev
            const newLink = subscriptionData.data.newLink
            const exists = prev.allLinks.links.find(
                ({ id }) => id === newLink.id
            )
            if (exists) return prev

            return Object.assign({}, prev, {
                allLinks: {
                    links: [newLink, ...prev.allLinks.links],
                    count: prev.allLinks.links.length + 1,
                    __typename: prev.allLinks.__typename
                }
            })
        }
    })

    subscribeToMore({
        document: NEW_VOTES_SUBSCRIPTION
    })

    return (
        <div>
            {loading ? <p>Loading...</p> : data && data.allLinks.links.map((link, index) => (
                <Link key={link.id} link={link} index={index} />
            ))}
            {error && <p>Error occured.</p>}
        </div>
    )
}

export default LinkList