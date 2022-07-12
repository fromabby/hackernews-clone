const newLinkSubscribe = (_, __, context, ___) => {
    return context.pubsub.asyncIterator("NEW_LINK")
}

const newVoteSubscribe = (_, __, context, ___) => {
    return context.pubsub.asyncIterator("NEW_VOTE")
}

const newLink = {
    subscribe: newLinkSubscribe,
    resolve: payload => payload
}

const newVote = {
    subscribe: newVoteSubscribe,
    resolve: payload => payload
}

module.exports = {
    newLink,
    newVote
}