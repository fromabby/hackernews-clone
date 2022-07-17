import { Comment } from 'components/comments'

const CommentList = ({ comments }) => {
    return (
        <div>
            <h5>Comments</h5>
            {comments && comments.map((comment) => (
                <Comment comment={comment} key={comment.id} />
            ))}
        </div>
    )
}

export default CommentList
