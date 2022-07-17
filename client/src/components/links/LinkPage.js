import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { SINGLE_LINK_QUERY } from 'gql/queries'
import { CommentList, CommentBox } from 'components/comments'
import { timeDifferenceForDate } from 'utils'

const LinkPage = () => {
    const { id } = useParams()

    const { data, loading, error } = useQuery(SINGLE_LINK_QUERY, {
        variables: {
            id: Number(id)
        }
    })

    const [linkInfo, setLinkInfo] = useState({
        linkId: 0,
        description: '',
        url: '',
        comments: [],
        user: {},
        createdAt: '',
        postedBy: {},
        votes: []
    })

    const { linkId, description, url, comments, createdAt, postedBy, votes } = linkInfo

    useEffect(() => {
        data && setLinkInfo({
            linkId: data.findLink.id,
            description: data.findLink.description,
            url: data.findLink.url,
            comments: data.findLink.comments,
            postedBy: data.findLink.postedBy,
            votes: data.findLink.votes,
            createdAt: data.findLink.createdAt,
        })
    }, [data])

    return (
        <div className="ml1">
            {!loading && data && <>
                <div>
                    <h3>{description} ({url})</h3>
                </div>
                <div className="f6 lh-copy gray">
                    {votes ? votes?.length : 0} votes | by{' '}
                    {postedBy ? postedBy.name : 'Unknown'}{' '}
                    {timeDifferenceForDate(createdAt)}
                </div>
                <hr style={{ margin: '10px 0' }} />
                <CommentList comments={comments} />
                <CommentBox linkId={linkId} />
            </>}
        </div>
    )
}

export default LinkPage
