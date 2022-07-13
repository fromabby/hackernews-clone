import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { CREATE_LINK_MUTATION } from './../../gql/mutations'
import { ALL_LINKS_QUERY } from './../../gql/queries'
import { LINKS_PER_PAGE } from '../../constants'

const CreateLink = () => {
    const navigate = useNavigate()
    const [linkInfo, setLinkInfo] = useState({
        description: '',
        url: ''
    })

    const { description, url } = linkInfo

    const [createLink] = useMutation(CREATE_LINK_MUTATION, {
        variables: {
            description,
            url
        },
        onCompleted: () => navigate('/'),
        onError: () => navigate('/?error=cannot post'),
        update: (cache, { data: { postLink } }) => {
            const take = LINKS_PER_PAGE
            const skip = 0
            const orderBy = { createdAt: 'desc' }

            const data = cache.readQuery({
                query: ALL_LINKS_QUERY,
                variables: {
                    take,
                    skip,
                    orderBy
                }
            })

            cache.writeQuery({
                query: ALL_LINKS_QUERY,
                data: {
                    allLinks: {
                        links: [postLink, ...data.allLinks.links]
                    }
                },
                variables: {
                    take,
                    skip,
                    orderBy
                }
            })
        },
    })

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    createLink()
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
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateLink