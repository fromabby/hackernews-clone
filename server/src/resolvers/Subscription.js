const newLink = {
    subscribe: (_, __, context) => context.pubsub.asyncIterator("NEW_LINK"),
    resolve: payload => payload
}

const newVote = {
    subscribe: (_, __, context) => context.pubsub.asyncIterator("NEW_VOTE"),
    resolve: payload => payload
}

const deleteVote = {
    subscribe: (_, __, context) => context.pubsub.asyncIterator("DELETE_VOTE"),
    resolve: payload => payload
}

const newComment = {
    subscribe: (_, __, context) => context.pubsub.asyncIterator("NEW_COMMENT"),
    resolve: payload => payload
}

const deleteComment = {
    subscribe: (_, __, context) => context.pubsub.asyncIterator("DELETE_COMMENT"),
    resolve: payload => payload
}

module.exports = {
    newLink,
    newVote,
    deleteVote,
    newComment,
    deleteComment
}