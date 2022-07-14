import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { SINGLE_LINK_QUERY } from 'gql/queries'
import { UPDATE_LINK_MUTATION } from 'gql/mutations'

const UpdateLink = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { loading, data, error } = useQuery(SINGLE_LINK_QUERY, {
        variables: {
            id: Number(id)
        }
    })

    const [linkInfo, setLinkInfo] = useState({
        linkId: 0,
        description: '',
        url: ''
    })

    const { linkId, description, url } = linkInfo

    const [updateLink] = useMutation(UPDATE_LINK_MUTATION, {
        variables: {
            id: linkId,
            description,
            url
        },
        onCompleted: () => {
            navigate('/')
        }
    })

    useEffect(() => {
        data && setLinkInfo({
            linkId: data.findLink.id,
            description: data.findLink.description,
            url: data.findLink.url
        })
    }, [data])

    return (
        !loading &&
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    updateLink()
                }}
            >
                <div className="flex flex-column mt3">
                    <input
                        className="mb2"
                        value={description}
                        onChange={(e) =>
                            setLinkInfo({
                                ...linkInfo,
                                description: e.target.value
                            })
                        }
                        type="text"
                        placeholder="A description for the link"
                    />
                    <input
                        className="mb2"
                        value={url}
                        onChange={(e) =>
                            setLinkInfo({
                                ...linkInfo,
                                url: e.target.value
                            })
                        }
                        type="text"
                        placeholder="The URL for the link"
                    />
                </div>
                <button type="submit">Update</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}

export default UpdateLink
