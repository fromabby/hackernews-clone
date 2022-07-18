import { useState, useEffect } from 'react'
import { timeDifferenceForDate } from 'utils'
import { DELETE_COMMENT_MUTATION } from 'gql/mutations'
import { SINGLE_LINK_QUERY } from 'gql/queries'
import { useMutation } from '@apollo/client'
import { AUTH_TOKEN } from 'constants'
import { getDataFromTree } from '@apollo/client/react/ssr'

const Comment = ({ comment, linkId }) => {
    const { id, text, createdAt, user } = comment

    const authToken = localStorage.getItem(AUTH_TOKEN)
    const [userId, setUserId] = useState(0)

    useEffect(() => {
        if (localStorage.getItem('User') !== null) {
            setUserId(JSON.parse(localStorage.getItem('User')).id)
        }
    }, [])

    const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
        variables: {
            id: Number(id)
        },
        // update: (cache, { data: { deleteComment } }) => {
        //     const { findLink } = cache.readQuery({
        //         query: SINGLE_LINK_QUERY,
        //         variables: {
        //             id: Number(linkId)
        //         }
        //     })

        //     cache.writeQuery({
        //         query: SINGLE_LINK_QUERY,
        //         variables: {
        //             id: Number(linkId)
        //         },
        //         data: {
        //             findLink: {
        //                 ...findLink,
        //                 comments: findLink.comments.filter(c => c.id !== id)
        //             }
        //         }
        //     })
        // }
    })

    return (
        <div className="ml1" style={{ margin: '10px 0' }}>
            <div>
                {text}
            </div>
            <div className="f6 lh-copy gray">
                by {user && user?.name ? user.name : 'Unknown'} | {timeDifferenceForDate(createdAt)}
            </div>
            {authToken && userId === user.id && <div>
                <button onClick={deleteComment}>Delete</button>
            </div>}
        </div>
    )
}

export default Comment
