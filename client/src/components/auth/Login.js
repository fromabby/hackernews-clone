import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { AUTH_TOKEN } from 'constants'
import { LOGIN_MUTATION, SIGNUP_MUTATION } from 'gql/mutations'

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
            localStorage.setItem('User', JSON.stringify(login.user))
            navigate('/?success=Logged in')
        },
        onError: () => {
            setCredentials({
                email: '',
                password: ''
            })
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
        },
        onError: () => {
            setCredentials({
                email: '',
                password: '',
                name: ''
            })
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
                    {login ? 'need to create an account?' : 'already have an account?'}
                </button>
            </div>
        </div>
    )
}

export default Login
