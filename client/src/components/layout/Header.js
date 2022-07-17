import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AUTH_TOKEN } from 'constants'

const Header = () => {
    const navigate = useNavigate()

    const authToken = localStorage.getItem(AUTH_TOKEN)

    const [user, setUser] = useState({
        id: 0,
        name: ''
    })

    const { id, name } = user

    useEffect(() => {
        if (localStorage.getItem('User') !== null) {
            setUser(JSON.parse(localStorage.getItem('User')))
        }
    }, [])

    return (
        <div className="flex pa1 justify-between nowrap orange">
            <div className="flex flex-fixed black">
                <Link to="/" className="no-underline black">
                    <div className="fw7 mr1">Hacker News</div>
                </Link>
                <Link to="/" className="ml1 no-underline black">
                    new
                </Link>
                <div className="ml1">|</div>
                <Link to="/top" className="ml1 no-underline black">
                    top
                </Link>
                <div className="ml1">|</div>
                <Link
                    to="/search"
                    className="ml1 no-underline black"
                >
                    search
                </Link>
                <div className="ml1">|</div>
                <div className="flex flex-fixed">
                    {authToken ? (
                        <>
                            <Link
                                to="/create"
                                className="ml1 no-underline black"
                            >
                                submit
                            </Link>
                            <div className="ml1">|</div>
                            <Link
                                to={`/profile/${id}`}
                                className="ml1 no-underline black"
                            >
                                {name}'s Profile
                            </Link>
                            <div className="ml1">|</div>
                            <div
                                className="ml1 pointer black"
                                onClick={() => {
                                    localStorage.removeItem(AUTH_TOKEN)
                                    localStorage.removeItem('User')
                                    navigate(`/`)
                                }}
                            >
                                logout
                            </div>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="ml1 no-underline black"
                        >
                            login
                        </Link>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Header