import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client'
import { AUTH_TOKEN } from '../constants'

const LOGIN_MUTATION = gql`
    mutation Login (
        $email: String!,
        $password: String!
    ) {
        login(email: $email, password: $password) {
            token
        }
    }
`

const SIGNUP_MUTATION = gql`
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

const Login = () => {
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        login: true,
        email: '',
        password: '',
        name: ''
    })

    const { email, password, login, name } = credentials

    const [log_in] = useMutation(LOGIN_MUTATION, {
        variables: {
            email,
            password
        },
        onCompleted: ({ login }) => {
            localStorage.setItem(AUTH_TOKEN, login.token)
            navigate('/?success=Logged in')
        }
    })

    const [signup] = useMutation(SIGNUP_MUTATION, {
        variables: {
            email,
            password,
            name
        },
        onCompleted: ({ signup }) => {
            localStorage.setItem(AUTH_TOKEN, signup.token)
            navigate('/login')
        }
    })

    return (
        <div>
            <h4 className="mv3">
                {login ? 'Login' : 'Sign Up'}
            </h4>
            <div className="flex flex-column">
                {!login && (
                    <input
                        value={name}
                        onChange={(e) =>
                            setCredentials({
                                ...credentials,
                                name: e.target.value
                            })
                        }
                        type="text"
                        placeholder="Your name"
                    />
                )}
                <input
                    value={email}
                    onChange={(e) =>
                        setCredentials({
                            ...credentials,
                            email: e.target.value
                        })
                    }
                    type="text"
                    placeholder="Your email address"
                />
                <input
                    value={password}
                    onChange={(e) =>
                        setCredentials({
                            ...credentials,
                            password: e.target.value
                        })
                    }
                    type="password"
                    placeholder="Choose a safe password"
                />
            </div>
            <div className="flex mt3">
                <button
                    className="pointer mr2 button"
                    onClick={login ? log_in : signup}
                >
                    {login ? 'login' : 'create account'}
                </button>
                <button
                    className="pointer button"
                    onClick={(e) =>
                        setCredentials({
                            ...credentials,
                            login: !login
                        })
                    }
                >
                    {login
                        ? 'need to create an account?'
                        : 'already have an account?'}
                </button>
            </div>
        </div>
    )
}

export default Login
