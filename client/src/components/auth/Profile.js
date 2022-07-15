import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { PROFILE_QUERY } from 'gql/queries'
import { Link } from 'components/links'

const Profile = () => {

    const { id } = useParams()
    const { loading, data, error } = useQuery(PROFILE_QUERY, { variables: { id: Number(id) } })

    return (
        <>
            {loading
                ? <p>Loading...</p>
                : data && <div className="flex flex-column mt3">
                    <p>Email: {data.profile.email}</p>
                    <p>Name: {data.profile.name}</p>
                    {data.profile.links && data.profile.links.map((link, index) => (
                        <Link
                            key={data.profile.links.id}
                            link={link}
                            index={index}
                        />
                    ))}
                </div>}
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
        </>
    )
}

export default Profile
