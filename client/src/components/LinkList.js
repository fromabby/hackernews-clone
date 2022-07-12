import Link from './Link'
import { useQuery, gql as graphql } from '@apollo/client'

const FEED_QUERY = graphql`
  {
    allLinks {
        count
        links {
        id
        description
        url
        }
    }
  }
`

const LinkList = () => {
    const { loading, data, error } = useQuery(FEED_QUERY)

    return (
        <div>
            {loading ? <p>Loading...</p> : data && data.allLinks.links.map((link) => (
                <Link key={link.id} link={link} />
            ))}
            {error && <p>Error occured.</p>}
        </div>
    )
}

export default LinkList