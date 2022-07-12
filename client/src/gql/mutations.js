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