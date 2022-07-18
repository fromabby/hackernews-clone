import { Comment } from 'components/comments'

const CommentList = ({ comments, linkId }) => {
    return (
        <div>
            <h5>Comments</h5>
            {comments && comments.map((comment) => (
                <Comment comment={comment} linkId={linkId} key={comment.id} />
            ))}
        </div>
    )
}

export default CommentList
