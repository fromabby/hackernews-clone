import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
mutation Login (
    $email: String!,
    $password: String!
) {
    login(email: $email, password: $password) {
        token
        user {
            id
            name
        }
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


export const UPDATE_LINK_MUTATION = gql`
mutation UpdateLinkMutation(
    $id: ID!
    $description: String!
    $url: String!
) {
  updateLink(id: $id, description: $description, url: $url) {
    	id
 		description
        url
  }
}
`

export const DELETE_LINK_MUTATION = gql`
mutation DeleteLink(
    $id: ID!
) {
 	deleteLink(id: $id) {
        id
 	}
}`

export const POST_COMMENT_MUTATION = gql`
mutation PostComment(
  $linkId: ID! 
  $text:String! 
  $userId:ID!
) {
  postComment(text:$text,linkId:$linkId,userId:$userId) {
		id
        text
        createdAt
        user {
            name
        }
  }
}
`

export const DELETE_COMMENT_MUTATION = gql`
mutation DeleteComment(
  $id:ID!
) {
  deleteComment(id:$id) {
		id
        text
        createdAt
  }
}
`