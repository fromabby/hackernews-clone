import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
mutation Login (
    $email: String!,
    $password: String!
) {
    login(email: $email, password: $password) {
        token
    }
}
`

export const SIGNUP_MUTATION = gql`
mutation Signup (
    $email: String!,
    $password: String!,
    $name: String!
) {
    signup(name: $name, email: $email, password: $password) {
        token
    }
}
`

export const VOTE_MUTATION = gql`
mutation VoteMutation($linkId: ID!) {
  vote(linkId: $linkId) {
    id
    link {
      id
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

export const CREATE_LINK_MUTATION = gql`
  mutation PostMutation(
    $description: String!
    $url: String!
  ) {
    postLink(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`
