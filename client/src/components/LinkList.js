import Link from './Link'
import { useQuery, gql as graphql } from '@apollo/client';

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
`;

const LinkList = () => {
    const { data } = useQuery(FEED_QUERY)

    return (
        <div>
            {data && data.allLinks.links.map((link) => (
                <Link key={link.id} link={link} />
            ))}
        </div>
    )
}

export default LinkList