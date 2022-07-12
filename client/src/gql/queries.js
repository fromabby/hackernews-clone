import { gql } from '@apollo/client'

export const ALL_LINKS_QUERY = gql`
{
  allLinks {
      count
      links {
      id
      description
      url
      }
  }
}
`