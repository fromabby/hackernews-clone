import { timeDifferenceForDate } from 'utils'

const Comment = ({ comment }) => {
    const { text, createdAt, user } = comment
    const { name } = user

    return (
        <div className="ml1" style={{ margin: '10px 0' }}>
            <div>
                {text}
            </div>
            <div className="f6 lh-copy gray">
                by {name} | {timeDifferenceForDate(createdAt)}
            </div>
        </div>
    )
}

export default Comment
