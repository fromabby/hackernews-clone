import Link from './Link'
import { useQuery } from '@apollo/client'
import { ALL_LINKS_QUERY } from '../../gql/queries'

const LinkList = () => {
    const { loading, data, error } = useQuery(ALL_LINKS_QUERY)

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