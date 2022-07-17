import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { SINGLE_LINK_QUERY } from 'gql/queries'
import { CommentList } from 'components/comments'

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
        comments: []
    })

    const { linkId, description, url, comments } = linkInfo

    useEffect(() => {
        data && setLinkInfo({
            linkId: data.findLink.id,
            description: data.findLink.description,
            url: data.findLink.url,
            comments: data.findLink.comments
        })
    }, [data])

    return (
        <div>
            {!loading && data && <>
                {linkId}
                {description}
                {url}
            </>}
            <CommentList comments={comments} />
        </div>
    )
}

export default LinkPage
