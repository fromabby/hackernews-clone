import { gql } from '@apollo/client'

export const ALL_LINKS_QUERY = gql`
query LinksQuery(
    $take: Int
    $skip: Int
    $orderBy: LinkOrderByInput
  ) {
    allLinks(take: $take, skip: $skip, orderBy: $orderBy) {
      id
      links {
        id
        createdAt
        url
        description
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
  }
`

export const FEED_SEARCH_QUERY = gql`
query SearchFilter(
    $filter: String!
) {
    allLinks(filter: $filter) {
      id
      links {
        id
        createdAt
        url
        description
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
}
`

export const SINGLE_LINK_QUERY = gql`
query SingleLink(
    $id: Int!
) {
    findLink(id: $id) {
        id
        url
        description
        comments {
            id
            text
            createdAt
            user {
                id
                name
            }
        }
        postedBy {
            id
            name
        }
        createdAt
    }
}
`

export const PROFILE_QUERY = gql`
query Profile(
    $id: Int!
){
  profile(id: $id) {
    id
    name
    email
    links {
        id
        description
        url
        createdAt
        postedBy {
            id
            name
        }
        votes {
            id
        }
    }
  }
}
`