import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { POST_COMMENT_MUTATION } from 'gql/mutations'
import { AUTH_TOKEN } from 'constants'

const CommentBox = ({ linkId }) => {
    const [text, setText] = useState('')

    const authToken = localStorage.getItem(AUTH_TOKEN)
    const [userId, setUserId] = useState(0)

    useEffect(() => {
        if (localStorage.getItem('User') !== null) {
            setUserId(JSON.parse(localStorage.getItem('User')).id)
        }
    }, [])

    const [comment, { loading }] = useMutation(POST_COMMENT_MUTATION, {
        variables: {
            userId,
            linkId,
            text
        }
    })

    return (
        <div>
            <textarea
                placeholder="Comment here"
                style={{
                    width: '50%'
                }}
                onChange={e => setText(e.target.value)}
                required
            ></textarea>
            <button
                className="pointer mr2 button"
                onClick={comment}
                disabled={authToken ? false : true}
            >
                {authToken ? loading ? 'Commenting...' : 'Comment' : 'login first'}
            </button>
        </div>
    )
}

export default CommentBox
