import { gql } from '@apollo/client'

export const NEW_LINKS_SUBSCRIPTION = gql`
subscription {
  newLink {
    id
    url
    description
    createdAt
    postedBy {
      id
      name
    }
    votes {
      id
      user {
        id
      }
    }
  }
}
`

export const NEW_VOTES_SUBSCRIPTION = gql`
subscription {
  newVote {
    id
    link {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
    user {
      id
    }
  }
}
`

export const NEW_COMMENT_SUBSCRIPTION = gql`
subscription {
  newComment {
    id
    text
    createdAt
    user {
      id
      name
    }
    link {
      id
    }
  }
}
`