import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { PROFILE_QUERY } from 'gql/queries'

const Profile = () => {

    const { id } = useParams()
    const { loading, data, error } = useQuery(PROFILE_QUERY, { variables: { id: Number(id) } })

    return (
        loading
            ? <p>Loading...</p>
            : data && <div className="flex flex-column mt3">
                <p>Email: {data.profile.email}</p>
                <p>Name: {data.profile.name}</p>
            </div>
    )
}

export default Profile
