import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { CREATE_LINK_MUTATION } from './../../gql/mutations'
import { ALL_LINKS_QUERY } from './../../gql/queries'
import { LINKS_PER_PAGE } from '../../constants'

const CreateLink = () => {
    const navigate = useNavigate()
    const [formState, setFormState] = useState({
        description: '',
        url: ''
    })

    const [createLink] = useMutation(CREATE_LINK_MUTATION, {
        variables: {
            description: formState.description,
            url: formState.url
        },
        onCompleted: () => navigate('/'),
        onError: () => navigate('/?error=cannot post'),
        // CACHING
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
            });

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
            });
        },
    })

    const submitHandler = e => {
        e.preventDefault()
        createLink()
    }

    return (
        <div>
            <form
                onSubmit={submitHandler}
            >
                <div className="flex flex-column mt3">
                    <input
                        className="mb2"
                        value={formState.description}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                description: e.target.value
                            })
                        }
                        type="text"
                        placeholder="A description for the link"
                    />
                    <input
                        className="mb2"
                        value={formState.url}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
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