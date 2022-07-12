import { gql } from '@apollo/client'

export const ALL_LINKS_QUERY = gql`
{
        allLinks {
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